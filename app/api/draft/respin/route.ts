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

    const result = await draftService.useReSpin(
      matchId,
      req.headers.get('x-user-id') || ''
    );

    return NextResponse.json(
      {
        success: true,
        data: result,
        message: 'Re-spin used successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Re-spin usage error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to use re-spin',
      },
      { status: 400 }
    );
  }
}
