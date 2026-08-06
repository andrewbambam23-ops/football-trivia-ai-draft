import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { team1Id, team2Id, gameMode, evaluationScope } = await req.json();

    if (!team1Id || !gameMode || !evaluationScope) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    const match = await prisma.draftMatch.create({
      data: {
        team1Id,
        team2Id: team2Id || null,
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

    // Create re-spin for each team
    await prisma.reSpin.create({
      data: {
        matchId: match.id,
        userId: team1Id,
      },
    });

    if (team2Id) {
      await prisma.reSpin.create({
        data: {
          matchId: match.id,
          userId: team2Id,
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        data: match,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Match creation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create match',
      },
      { status: 400 }
    );
  }
}
