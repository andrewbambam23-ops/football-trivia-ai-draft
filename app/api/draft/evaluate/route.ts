import { NextRequest, NextResponse } from 'next/server';
import { draftService } from '@/lib/services/draft.service';

export async function POST(req: NextRequest) {
  try {
    const { matchId } = await req.json();

    if (!matchId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required field: matchId',
        },
        { status: 400 }
      );
    }

    const evaluation = await draftService.evaluateRosters(matchId);

    return NextResponse.json(
      {
        success: true,
        data: evaluation,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Roster evaluation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to evaluate rosters',
      },
      { status: 400 }
    );
  }
}
