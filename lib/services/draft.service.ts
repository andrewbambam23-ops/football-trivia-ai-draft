import { PrismaClient } from '@prisma/client';
import { aiService } from './ai.service';

const prisma = new PrismaClient();

export class DraftService {
  async createDraftMatch(
    team1Id: string,
    team2Id: string | null,
    gameMode: string,
    evaluationScope: string
  ) {
    const match = await prisma.draftMatch.create({
      data: {
        team1Id,
        team2Id,
        gameMode,
        evaluationScope,
      },
      include: {
        rosterSlots: true,
      },
    });

    // Initialize roster slots
    const rosterSlots = [
      { position: 'QB', count: 1 },
      { position: 'RB', count: 2 },
      { position: 'WR/TE', count: 3 },
      { position: 'DEF', count: 2 },
    ];

    for (const slot of rosterSlots) {
      for (let i = 0; i < slot.count; i++) {
        await prisma.rosterSlot.create({
          data: {
            matchId: match.id,
            teamId: team1Id,
            position: slot.position,
          },
        });
        if (team2Id) {
          await prisma.rosterSlot.create({
            data: {
              matchId: match.id,
              teamId: team2Id,
              position: slot.position,
            },
          });
        }
      }
    }

    return match;
  }

  async generateCategory(
    matchId: string,
    teamId: string,
    turnNumber: number,
    complexity: string = '1-Way'
  ) {
    const match = await prisma.draftMatch.findUnique({
      where: { id: matchId },
      include: {
        draftPlayers: true,
        categories: true,
        rosterSlots: {
          where: { teamId },
        },
      },
    });

    if (!match) {
      throw new Error('Match not found');
    }

    const remainingSlots = match.rosterSlots
      .filter((slot) => !slot.isFilledAt)
      .map((slot) => slot.position);

    const remainingPositions = [...new Set(remainingSlots)];

    const previousCategories = match.categories.map((cat) => cat.category);

    const category = await aiService.generateCategory(
      2, // TODO: make dynamic
      turnNumber,
      remainingSlots,
      remainingPositions,
      previousCategories,
      complexity
    );

    // Store category
    const storedCategory = await prisma.draftCategory.create({
      data: {
        matchId,
        teamId,
        turnOrder: turnNumber,
        category: category.category,
        complexity: category.complexity,
      },
    });

    return storedCategory;
  }

  async selectPlayer(
    matchId: string,
    rosterSlotId: string,
    userId: string,
    playerName: string,
    position: string,
    category: string
  ) {
    const rosterSlot = await prisma.rosterSlot.findUnique({
      where: { id: rosterSlotId },
    });

    if (!rosterSlot) {
      throw new Error('Roster slot not found');
    }

    if (rosterSlot.isFilledAt) {
      throw new Error('Roster slot already filled');
    }

    // Validate player against category
    const validation = await aiService.validatePlayerCategory(
      playerName,
      category,
      '1-Way', // TODO: get from category
      [position],
      'FullCareer' // TODO: get from match config
    );

    if (!validation.matches) {
      throw new Error(`Player does not match category: ${validation.explanation}`);
    }

    // Create draft player
    const draftPlayer = await prisma.draftPlayer.create({
      data: {
        matchId,
        rosterSlotId,
        userId,
        playerName,
        position,
        category,
        aiRating: 0, // Will be set during evaluation
      },
    });

    // Update roster slot
    await prisma.rosterSlot.update({
      where: { id: rosterSlotId },
      data: { isFilledAt: new Date() },
    });

    return draftPlayer;
  }

  async searchPlayers(
    query: string,
    category: string,
    redactionFields: string[] = [],
    limit: number = 15
  ) {
    return aiService.searchPlayers(query, category, redactionFields, limit);
  }

  async evaluateRosters(matchId: string) {
    const match = await prisma.draftMatch.findUnique({
      where: { id: matchId },
      include: {
        draftPlayers: true,
        team1: true,
        team2: true,
      },
    });

    if (!match) {
      throw new Error('Match not found');
    }

    const team1Players = match.draftPlayers.filter(
      (p) => p.userId === match.team1Id
    );
    const team2Players = match.draftPlayers.filter(
      (p) => p.userId === match.team2Id
    );

    const evaluation = await aiService.evaluateRoster(
      team1Players,
      team2Players,
      match.evaluationScope
    );

    // Update player ratings
    for (const player of evaluation.team1.players) {
      await prisma.draftPlayer.updateMany({
        where: {
          matchId,
          playerName: player.name,
        },
        data: {
          aiRating: player.rating,
          aiAnalysis: player.analysis,
        },
      });
    }

    for (const player of evaluation.team2.players) {
      await prisma.draftPlayer.updateMany({
        where: {
          matchId,
          playerName: player.name,
        },
        data: {
          aiRating: player.rating,
          aiAnalysis: player.analysis,
        },
      });
    }

    // Update match scores and winner
    await prisma.draftMatch.update({
      where: { id: matchId },
      data: {
        team1Score: evaluation.team1.overallRating,
        team2Score: evaluation.team2.overallRating,
        winner: evaluation.winner,
        status: 'completed',
        completedAt: new Date(),
      },
    });

    return evaluation;
  }

  async getPlayerStatLog(playerName: string, position: string, scope: string) {
    return aiService.generatePlayerStatLog(playerName, position, scope);
  }

  async useReSpin(matchId: string, userId: string) {
    const reSpin = await prisma.reSpin.findUnique({
      where: { matchId },
    });

    if (!reSpin) {
      throw new Error('Re-spin not found for this match');
    }

    if (reSpin.usedAt) {
      throw new Error('Re-spin already used in this match');
    }

    await prisma.reSpin.update({
      where: { matchId },
      data: { usedAt: new Date() },
    });

    return reSpin;
  }
}

export const draftService = new DraftService();
