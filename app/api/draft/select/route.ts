import { NextRequest, NextResponse } from 'next/server';
import { draftService } from '@/lib/services/draft.service';
import { PlayerSelectionSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedSelection = PlayerSelectionSchema.parse(body);

    const player = await draftService.selectPlayer(
      validatedSelection.matchId,
      validatedSelection.rosterSlotId,
      body.userId, // Get from auth context in production
      validatedSelection.playerName,
      validatedSelection.position,
      validatedSelection.category
    );

    return NextResponse.json(
      {
        success: true,
        data: player,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Player selection error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to select player',
      },
      { status: 400 }
    );
  }
}
