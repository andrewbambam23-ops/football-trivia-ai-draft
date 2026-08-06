export const DIFFICULTY_LEVELS = {
  VeryEasy: 'Very Easy',
  Easy: 'Easy',
  Moderate: 'Moderate',
  Hard: 'Hard',
  VeryHard: 'Very Hard',
  FootballJunkie: 'Football Junkie',
} as const;

export const QUESTION_FORMATS = {
  TrueFalse: 'True/False',
  MultipleChoice: 'Multiple Choice',
  MultiSelect: 'Multi-Select',
  ChronologicalOrdering: 'Chronological Ordering',
  FillInTheBlank: 'Fill-in-the-Blank',
} as const;

export const LEAGUE_CONTEXTS = {
  NCAA: 'NCAA',
  NFL: 'NFL',
  General: 'General',
} as const;

export const TRIVIA_CATEGORIES = {
  Records: 'Records',
  Rivalries: 'Rivalries',
  GameHistory: 'Game History',
  CoachingHistory: 'Coaching History',
  StadiumHistory: 'Stadium History',
  MascotHistory: 'Mascot History',
  RulesHistory: 'Rules History',
  RingOfHonor: 'Ring of Honor',
  CollegeFootballHOF: 'College Football HOF',
  Awards: 'Awards',
} as const;

export const NCAA_FILTERS = {
  conferences: ['SEC', 'Big Ten', 'Big 12', 'ACC', 'Pac-12', 'FBS Independent', 'Group of Five'],
  powerFiveConferences: ['SEC', 'Big Ten', 'Big 12', 'ACC', 'Pac-12'],
  decades: ['1940s', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s+'],
} as const;

export const NFL_DIVISIONS = {
  AFC: ['AFC East', 'AFC Central', 'AFC South', 'AFC West'],
  NFC: ['NFC East', 'NFC Central', 'NFC South', 'NFC West'],
} as const;

export const ROSTER_POSITIONS = {
  QB: 'Quarterback (1)',
  RB: 'Running Back (2)',
  'WR/TE': 'Wide Receiver / Tight End (3)',
  DEF: 'Defensive Player (2)',
} as const;

export const EVALUATION_SCOPES = {
  FullCareer: 'Full Career',
  BestSingleSeason: 'Best Single Season',
  PlayoffOnly: 'Playoff Performances Only',
  ChampionshipOnly: 'Championship Performances Only',
  BowlGameOnly: 'Bowl Game Performances Only',
  ConferenceChampionshipOnly: 'Conference Championship Performances Only',
} as const;

export const CATEGORY_COMPLEXITY = {
  OneWay: '1-Way',
  TwoWay: '2-Way',
  ThreeWay: '3-Way',
} as const;

export const REDACTION_RULE_TEMPLATES = {
  jerseyNumber: ['jerseyNumber'],
  team: ['team', 'nflTeam', 'collegeTeam'],
  position: ['position'],
  era: ['activeYears'],
  coach: ['headCoach', 'coachHistory'],
} as const;
