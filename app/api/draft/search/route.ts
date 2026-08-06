import { NextRequest, NextResponse } from 'next/server';
import { draftService } from '@/lib/services/draft.service';
import { PlayerSearchSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedSearch = PlayerSearchSchema.parse(body);

    const players = await draftService.searchPlayers(
      validatedSearch.query,
      validatedSearch.category,
      validatedSearch.redactionFields || [],
      validatedSearch.limit
    );

    return NextResponse.json(
      {
        success: true,
        data: players,
        count: players.length,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Player search error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to search players',
      },
      { status: 400 }
    );
  }
}
