import { NextRequest, NextResponse } from 'next/server';
import { draftService } from '@/lib/services/draft.service';

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

    const statLog = await draftService.getPlayerStatLog(
      req.nextUrl.searchParams.get('playerName') || '',
      req.nextUrl.searchParams.get('position') || '',
      req.nextUrl.searchParams.get('scope') || 'FullCareer'
    );

    return NextResponse.json(
      {
        success: true,
        data: statLog,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Stat log retrieval error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to retrieve stat log',
      },
      { status: 400 }
    );
  }
}
