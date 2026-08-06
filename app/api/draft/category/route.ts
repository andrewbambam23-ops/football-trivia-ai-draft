import { NextRequest, NextResponse } from 'next/server';
import { draftService } from '@/lib/services/draft.service';

export async function POST(req: NextRequest) {
  try {
    const {
      matchId,
      teamId,
      turnNumber,
      complexity,
    } = await req.json();

    if (!matchId || !teamId || turnNumber === undefined) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: matchId, teamId, turnNumber',
        },
        { status: 400 }
      );
    }

    const category = await draftService.generateCategory(
      matchId,
      teamId,
      turnNumber,
      complexity
    );

    return NextResponse.json(
      {
        success: true,
        data: category,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Category generation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to generate category',
      },
      { status: 400 }
    );
  }
}
