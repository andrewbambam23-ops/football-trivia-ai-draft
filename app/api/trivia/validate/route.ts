import { NextRequest, NextResponse } from 'next/server';
import { triviaService } from '@/lib/services/trivia.service';

export async function POST(req: NextRequest) {
  try {
    const { questionId, userId, selectedAnswer } = await req.json();

    if (!questionId || !userId || !selectedAnswer) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: questionId, userId, selectedAnswer',
        },
        { status: 400 }
      );
    }

    const result = await triviaService.validateAnswer(
      questionId,
      userId,
      selectedAnswer
    );

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Answer validation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to validate answer',
      },
      { status: 400 }
    );
  }
}
