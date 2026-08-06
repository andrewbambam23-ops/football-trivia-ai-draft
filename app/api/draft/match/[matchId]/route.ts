import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { matchId: string } }
) {
  try {
    const { matchId } = params;

    if (!matchId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required parameter: matchId',
        },
        { status: 400 }
      );
    }

    const match = await prisma.draftMatch.findUnique({
      where: { id: matchId },
      include: {
        draftPlayers: true,
        rosterSlots: true,
        categories: true,
        team1: true,
        team2: true,
      },
    });

    if (!match) {
      return NextResponse.json(
        {
          success: false,
          error: 'Match not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: match,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Match retrieval error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to retrieve match',
      },
      { status: 400 }
    );
  }
}
