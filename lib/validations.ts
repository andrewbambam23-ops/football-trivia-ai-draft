import { z } from 'zod';

export const TriviaConfigSchema = z.object({
  leagueContext: z.enum(['NCAA', 'NFL', 'General']),
  difficulty: z.enum(['VeryEasy', 'Easy', 'Moderate', 'Hard', 'VeryHard', 'FootballJunkie']),
  questionFormat: z.enum(['TrueFalse', 'MultipleChoice', 'MultiSelect', 'ChronologicalOrdering', 'FillInTheBlank']),
  gameMode: z.enum(['Local', 'Online']),
  winCondition: z.enum(['TargetScore', 'TotalQuestions']),
  targetScore: z.number().optional(),
  totalQuestions: z.number().optional(),
});

export const TriviaFiltersSchema = z.object({
  team: z.string().optional(),
  conference: z.string().optional(),
  isPowerFive: z.boolean().optional(),
  isGroupOfFive: z.boolean().optional(),
  decade: z.string().optional(),
  year: z.number().optional(),
  playoffOnly: z.boolean().optional(),
  nationalChampionshipOnly: z.boolean().optional(),
  bowlGamesOnly: z.boolean().optional(),
  division: z.string().optional(),
  conferenceFilter: z.string().optional(),
  superBowlOnly: z.boolean().optional(),
});

export const PlayerSearchSchema = z.object({
  query: z.string().min(1),
  category: z.string(),
  redactionFields: z.array(z.string()).optional(),
  limit: z.number().default(15),
});

export const DraftConfigSchema = z.object({
  gameMode: z.enum(['Local', 'Online']),
  evaluationScope: z.enum([
    'FullCareer',
    'BestSingleSeason',
    'PlayoffOnly',
    'ChampionshipOnly',
    'BowlGameOnly',
    'ConferenceChampionshipOnly',
  ]),
});

export const DraftCategorySchema = z.object({
  complexity: z.enum(['1-Way', '2-Way', '3-Way']),
  category: z.string(),
  applicablePositions: z.array(z.string()),
});

export const PlayerSelectionSchema = z.object({
  matchId: z.string(),
  rosterSlotId: z.string(),
  playerName: z.string(),
  position: z.string(),
  category: z.string(),
});

export const RosterEvaluationSchema = z.object({
  matchId: z.string(),
  evaluationScope: z.string(),
  team1Players: z.array(z.object({
    name: z.string(),
    position: z.string(),
    category: z.string(),
  })),
  team2Players: z.array(z.object({
    name: z.string(),
    position: z.string(),
    category: z.string(),
  })),
});

export type TriviaConfig = z.infer<typeof TriviaConfigSchema>;
export type TriviaFilters = z.infer<typeof TriviaFiltersSchema>;
export type PlayerSearch = z.infer<typeof PlayerSearchSchema>;
export type DraftConfig = z.infer<typeof DraftConfigSchema>;
export type DraftCategory = z.infer<typeof DraftCategorySchema>;
export type PlayerSelection = z.infer<typeof PlayerSelectionSchema>;
export type RosterEvaluation = z.infer<typeof RosterEvaluationSchema>;
