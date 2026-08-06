import { NextRequest, NextResponse } from 'next/server';
import { triviaService } from '@/lib/services/trivia.service';
import { TriviaConfigSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request
    const validatedConfig = TriviaConfigSchema.parse(body);

    const question = await triviaService.generateQuestion(
      validatedConfig.leagueContext,
      validatedConfig.difficulty,
      validatedConfig.questionFormat,
      body.category,
      body.filters || {}
    );

    return NextResponse.json(
      {
        success: true,
        data: question,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Trivia generation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to generate trivia question',
      },
      { status: 400 }
    );
  }
}
