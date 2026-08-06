import { PrismaClient } from '@prisma/client';
import { aiService } from './ai.service';

const prisma = new PrismaClient();

export class TriviaService {
  async generateQuestion(
    leagueContext: string,
    difficulty: string,
    questionFormat: string,
    category: string,
    filters: Record<string, any>
  ) {
    try {
      const question = await aiService.generateTriviaQuestion(
        leagueContext,
        difficulty,
        questionFormat,
        category,
        filters
      );

      // Store in database
      const storedQuestion = await prisma.triviaQuestion.create({
        data: {
          question: question.question,
          format: question.format,
          correctAnswer: question.correctAnswer,
          options: question.options || [],
          difficulty: question.difficulty,
          category: question.category,
          leagueContext,
          redactionFields: question.redactionFields || [],
          sessionId: '', // Will be set by caller
        },
      });

      return storedQuestion;
    } catch (error) {
      console.error('Error generating trivia question:', error);
      throw error;
    }
  }

  async validateAnswer(
    questionId: string,
    userId: string,
    selectedAnswer: string
  ) {
    const question = await prisma.triviaQuestion.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      throw new Error('Question not found');
    }

    const isCorrect = selectedAnswer === question.correctAnswer;

    // Store answer
    const answer = await prisma.triviaAnswer.create({
      data: {
        questionId,
        userId,
        selectedAnswer,
        isCorrect,
      },
    });

    return answer;
  }

  async getQuestionWithRedactions(
    questionId: string,
    includeRedactions: boolean = false
  ) {
    const question = await prisma.triviaQuestion.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      throw new Error('Question not found');
    }

    return {
      ...question,
      redactionFields: includeRedactions ? question.redactionFields : [],
    };
  }
}

export const triviaService = new TriviaService();
