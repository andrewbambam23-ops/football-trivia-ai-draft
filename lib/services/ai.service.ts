import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { z } from 'zod';
import {
  TRIVIA_GENERATION_PROMPT,
  CATEGORY_VALIDATION_PROMPT,
  DYNAMIC_PLAYER_SEARCH_PROMPT,
  ROSTER_EVALUATION_PROMPT,
  CATEGORY_GENERATOR_PROMPT,
  PLAYER_STAT_LOG_PROMPT,
} from './prompts';

const prisma = new PrismaClient();

export class AIService {
  private apiKey: string;
  private model: string = 'gpt-4';
  private baseURL: string = 'https://api.openai.com/v1';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.OPENAI_API_KEY || '';
  }

  async callLLM(systemPrompt: string, userPrompt: string): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const content = response.data.choices[0].message.content;
      return content;
    } catch (error) {
      console.error('LLM API Error:', error);
      throw new Error('Failed to call LLM service');
    }
  }

  async generateTriviaQuestion(
    leagueContext: string,
    difficulty: string,
    questionFormat: string,
    category: string,
    filters: Record<string, any>
  ): Promise<any> {
    const prompt = TRIVIA_GENERATION_PROMPT
      .replace('{leagueContext}', leagueContext)
      .replace('{difficulty}', difficulty)
      .replace('{questionFormat}', questionFormat)
      .replace('{category}', category)
      .replace('{filters}', JSON.stringify(filters));

    const response = await this.callLLM(
      'You are an expert football trivia question generator.',
      prompt
    );

    try {
      return JSON.parse(response);
    } catch (error) {
      console.error('Failed to parse trivia question response:', response);
      throw new Error('Invalid trivia question format from LLM');
    }
  }

  async validatePlayerCategory(
    playerName: string,
    category: string,
    complexity: string,
    positions: string[],
    scope: string
  ): Promise<any> {
    const prompt = CATEGORY_VALIDATION_PROMPT
      .replace('{category}', category)
      .replace('{complexity}', complexity)
      .replace('{positions}', positions.join(', '))
      .replace('{scope}', scope)
      .replace('{playerName}', playerName);

    const response = await this.callLLM(
      'You are an expert football AI evaluator.',
      prompt
    );

    try {
      return JSON.parse(response);
    } catch (error) {
      console.error('Failed to parse validation response:', response);
      throw new Error('Invalid validation format from LLM');
    }
  }

  async searchPlayers(
    query: string,
    category: string,
    redactedFields: string[] = [],
    limit: number = 15
  ): Promise<any[]> {
    const prompt = DYNAMIC_PLAYER_SEARCH_PROMPT
      .replace('{query}', query)
      .replace('{category}', category)
      .replace('{redactedFields}', JSON.stringify(redactedFields))
      .replace('{limit}', limit.toString());

    const response = await this.callLLM(
      'You are an expert football historian.',
      prompt
    );

    try {
      return JSON.parse(response);
    } catch (error) {
      console.error('Failed to parse player search response:', response);
      throw new Error('Invalid player search format from LLM');
    }
  }

  async evaluateRoster(
    team1Players: any[],
    team2Players: any[],
    scope: string
  ): Promise<any> {
    const prompt = ROSTER_EVALUATION_PROMPT
      .replace('{scope}', scope)
      .replace('{team1Players}', JSON.stringify(team1Players, null, 2))
      .replace('{team2Players}', JSON.stringify(team2Players, null, 2));

    const response = await this.callLLM(
      'You are an elite football analyst.',
      prompt
    );

    try {
      return JSON.parse(response);
    } catch (error) {
      console.error('Failed to parse roster evaluation response:', response);
      throw new Error('Invalid roster evaluation format from LLM');
    }
  }

  async generateCategory(
    teamCount: number,
    turnNumber: number,
    remainingSlots: string[],
    remainingPositions: string[],
    previousCategories: string[],
    complexity: string
  ): Promise<any> {
    const prompt = CATEGORY_GENERATOR_PROMPT
      .replace('{teamCount}', teamCount.toString())
      .replace('{turnNumber}', turnNumber.toString())
      .replace('{remainingSlots}', JSON.stringify(remainingSlots))
      .replace('{remainingPositions}', JSON.stringify(remainingPositions))
      .replace('{previousCategories}', JSON.stringify(previousCategories))
      .replace('{complexity}', complexity);

    const response = await this.callLLM(
      'You are an expert at creating dynamic draft categories.',
      prompt
    );

    try {
      return JSON.parse(response);
    } catch (error) {
      console.error('Failed to parse category generation response:', response);
      throw new Error('Invalid category generation format from LLM');
    }
  }

  async generatePlayerStatLog(
    playerName: string,
    position: string,
    scope: string
  ): Promise<any> {
    const prompt = PLAYER_STAT_LOG_PROMPT
      .replace('{playerName}', playerName)
      .replace('{position}', position)
      .replace('{scope}', scope);

    const response = await this.callLLM(
      'You are a football statistics expert.',
      prompt
    );

    try {
      return JSON.parse(response);
    } catch (error) {
      console.error('Failed to parse stat log response:', response);
      throw new Error('Invalid stat log format from LLM');
    }
  }
}

export const aiService = new AIService();
