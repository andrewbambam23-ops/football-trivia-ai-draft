// Types for Trivia Engine
export interface TriviaConfig {
  leagueContext: 'NCAA' | 'NFL' | 'General';
  difficulty: DifficultyLevel;
  questionFormat: QuestionFormat;
  gameMode: 'Local' | 'Online';
  winCondition: 'TargetScore' | 'TotalQuestions';
  targetScore?: number;
  totalQuestions?: number;
}

export type DifficultyLevel = 
  | 'VeryEasy'
  | 'Easy'
  | 'Moderate'
  | 'Hard'
  | 'VeryHard'
  | 'FootballJunkie';

export type QuestionFormat =
  | 'TrueFalse'
  | 'MultipleChoice'
  | 'MultiSelect'
  | 'ChronologicalOrdering'
  | 'FillInTheBlank';

export interface TriviaQuestion {
  id: string;
  question: string;
  format: QuestionFormat;
  correctAnswer: string;
  options?: string[];
  difficulty: DifficultyLevel;
  category: TriviaCategory;
  leagueContext: 'NCAA' | 'NFL';
  redactionFields: string[]; // Fields to mask in search modal
}

export type TriviaCategory =
  | 'Records'
  | 'Rivalries'
  | 'GameHistory'
  | 'CoachingHistory'
  | 'StadiumHistory'
  | 'MascotHistory'
  | 'RulesHistory'
  | 'RingOfHonor'
  | 'CollegeFootballHOF'
  | 'Awards';

export interface TriviaFilters {
  // NCAA Filters
  team?: string;
  conference?: string;
  isPowerFive?: boolean;
  isGroupOfFive?: boolean;
  decade?: string; // "1940s", "1950s", etc.
  year?: number;
  playoffOnly?: boolean;
  nationalChampionshipOnly?: boolean;
  bowlGamesOnly?: boolean;
  // NFL Filters
  division?: string; // AFC East, NFC West, etc.
  conferenceFilter?: string; // AFC, NFC
  superBowlOnly?: boolean;
}

export interface PlayerSearchResult {
  id: string;
  name: string;
  position: string;
  team: string;
  teamHistory: string[];
  activeYears: string;
  jerseyNumber: number;
  conference?: string;
  collegeTeam?: string;
  nflTeam?: string;
  matchesCategory: boolean;
}

// Types for Draft Engine
export interface DraftConfig {
  gameMode: 'Local' | 'Online';
  evaluationScope: EvaluationScope;
}

export type EvaluationScope =
  | 'FullCareer'
  | 'BestSingleSeason'
  | 'PlayoffOnly'
  | 'ChampionshipOnly'
  | 'BowlGameOnly'
  | 'ConferenceChampionshipOnly';

export interface RosterSlot {
  id: string;
  position: 'QB' | 'RB' | 'WR/TE' | 'DEF';
  filled: boolean;
  player?: DraftedPlayer;
}

export interface RosterComposition {
  slots: {
    QB: RosterSlot[];
    RB: RosterSlot[];
    'WR/TE': RosterSlot[];
    DEF: RosterSlot[];
  };
  remainingSlots: number;
}

export interface DraftCategory {
  id: string;
  category: string;
  complexity: '1-Way' | '2-Way' | '3-Way';
  applicablePositions: string[];
  validPlayers: DraftedPlayer[];
}

export interface DraftedPlayer {
  id: string;
  name: string;
  position: string;
  jerseyNumber?: number;
  team: string;
  era: string;
  category: string;
  aiRating: number; // 1-100
  aiAnalysis: string;
  statLog: PlayerStats;
}

export interface PlayerStats {
  scope: EvaluationScope;
  career: CareerStats;
  highlighted: CareerStats; // Based on scope
  awards: string[];
  achievements: string[];
}

export interface CareerStats {
  passingYards?: number;
  passingTouchdowns?: number;
  interceptions?: number;
  rushingYards?: number;
  rushingTouchdowns?: number;
  receivingYards?: number;
  receivingTouchdowns?: number;
  sacks?: number;
  interceptions?: number;
  tackles?: number;
  forcedFumbles?: number;
  [key: string]: number | undefined;
}

export interface AIRosterEvaluation {
  teamRating: number; // 1-100
  analysis: string;
  strength: string[];
  weakness: string[];
  players: {
    name: string;
    rating: number;
    analysis: string;
  }[];
}

export interface GameResult {
  winner: 'team1' | 'team2' | 'tie';
  team1Score: number;
  team2Score: number;
  suddenDeath: boolean;
  rosters: {
    team1: DraftedPlayer[];
    team2: DraftedPlayer[];
  };
  evaluations: {
    team1: AIRosterEvaluation;
    team2: AIRosterEvaluation;
  };
}

// WebSocket Types
export interface WebSocketMessage {
  type: string;
  payload: any;
  timestamp: number;
}

export interface GameStateUpdate {
  type: 'gameStateUpdate';
  payload: {
    matchId: string;
    currentTurn: number;
    activeTeam: string;
    rosterSlots: RosterSlot[];
    currentCategory: DraftCategory;
    remainingPlayers: number;
  };
}

export interface PlayerSelectedEvent {
  type: 'playerSelected';
  payload: {
    matchId: string;
    teamId: string;
    player: DraftedPlayer;
    rosterSlotId: string;
  };
}
