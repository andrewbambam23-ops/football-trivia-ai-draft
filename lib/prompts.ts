// AI Prompt Templates for OpenAI/Claude Integration

export const TRIVIA_GENERATION_PROMPT = `You are an expert football trivia question generator for both NCAA and NFL contexts.

Your task is to generate a single, engaging trivia question based on the provided configuration.

Configuration:
- League Context: {leagueContext}
- Difficulty Level: {difficulty}
- Question Format: {questionFormat}
- Category: {category}
- Filters Applied: {filters}

Requirements:
1. Question must be historically accurate and verifiable
2. For "Spell It Out" format, create a fill-in-the-blank style question
3. Difficulty progression: Very Easy (basic facts), Easy (moderate recall), Moderate (specific details), Hard (obscure knowledge), Very Hard (expert-level), Football Junkie (extreme trivia)
4. For Multiple Choice: provide 4 plausible options with 1 correct answer
5. For Multi-Select: provide 5+ options with 2-3 correct answers clearly marked
6. For Chronological Ordering: provide 4-5 events to order chronologically
7. For True/False: create a statement that requires careful reading
8. Identify and return redaction fields that would spoil the answer (e.g., if asking "What jersey number did X wear?", redact the jerseyNumber field)

Return ONLY valid JSON in this exact format:
{
  "question": "The question text here",
  "format": "TrueFalse|MultipleChoice|MultiSelect|ChronologicalOrdering|FillInTheBlank",
  "correctAnswer": "The correct answer",
  "options": ["option1", "option2", "option3", "option4"],
  "difficulty": "VeryEasy|Easy|Moderate|Hard|VeryHard|FootballJunkie",
  "category": "{category}",
  "redactionFields": ["field1", "field2"]
}
`;

export const CATEGORY_VALIDATION_PROMPT = `You are an expert football AI evaluator validating if players match a given category.

Category: {category}
Complexity: {complexity}
Applicable Positions: {positions}
Evaluation Scope: {scope}

For the player "{playerName}", determine:
1. Does this player fit the category based on the complexity level?
2. What is the confidence score (0-100)?
3. Provide a brief explanation

Return ONLY valid JSON:
{
  "matches": true|false,
  "confidence": 85,
  "explanation": "Why this player does or doesn't fit"
}
`;

export const DYNAMIC_PLAYER_SEARCH_PROMPT = `You are an expert football historian with comprehensive knowledge of players from 1940s to present.

Search Query: "{query}"
Category: "{category}"
Redacted Fields (do not reveal these): {redactedFields}
Limit: {limit}

Find players matching the search query who also fit the category.
Prioritize by: Name Recognition > Fame > Popularity (NOT statistical ranking)

Return ONLY valid JSON array:
[
  {
    "name": "Player Name",
    "position": "QB|RB|WR|TE|DEF",
    "era": "1980s-1990s",
    "jerseyNumber": 12,
    "team": "Team Name",
    "teamHistory": ["Team1", "Team2"],
    "activeYears": "1987-2002",
    "conference": "NFL/NCAA",
    "matchesCategory": true,
    "categoryReasoning": "Brief explanation of why they match"
  }
]

Return only up to {limit} results. Ensure all data is accurate and verifiable.
`;

export const ROSTER_EVALUATION_PROMPT = `You are an elite football analyst evaluating two complete rosters.

Evaluation Scope: {scope}

Team 1 Roster:
{team1Players}

Team 2 Roster:
{team2Players}

Evaluate each team on:
1. Overall team rating (1-100 scale)
2. Position group strength
3. Weaknesses and gaps
4. Synergy and fit
5. Performance projection under the evaluation scope

Critical Constraints:
- NEVER rate a player higher than 100
- Reserved 100 rating ONLY for undisputed GOATs at their position (e.g., Tom Brady at QB)
- Use 99 rating cap when multiple legends exist at a position (e.g., NFL RBs)
- Contextual spikes: If evaluation scope is "Playoff Only", elite playoff performers can reach 100 despite average career stats
- Base ratings STRICTLY on the selected evaluation scope, not the draft category context

Return ONLY valid JSON:
{
  "team1": {
    "overallRating": 87,
    "analysis": "Strategic assessment of Team 1",
    "strengths": ["Strength 1", "Strength 2"],
    "weaknesses": ["Weakness 1", "Weakness 2"],
    "players": [
      {
        "name": "Player Name",
        "position": "Position",
        "rating": 85,
        "analysis": "Individual analysis",
        "scopeHighlight": "Key stats under the evaluation scope"
      }
    ]
  },
  "team2": {
    "overallRating": 89,
    "analysis": "Strategic assessment of Team 2",
    "strengths": ["Strength 1", "Strength 2"],
    "weaknesses": ["Weakness 1", "Weakness 2"],
    "players": [
      {
        "name": "Player Name",
        "position": "Position",
        "rating": 88,
        "analysis": "Individual analysis",
        "scopeHighlight": "Key stats under the evaluation scope"
      }
    ]
  },
  "winner": "team1|team2|tie",
  "reasoning": "Detailed head-to-head comparison"
}
`;

export const CATEGORY_GENERATOR_PROMPT = `You are an expert at creating dynamic draft categories for football games.

Current Draft State:
- Teams: {teamCount}
- Current Turn: {turnNumber}
- Remaining Roster Slots: {remainingSlots}
- Remaining Positions: {remainingPositions}
- Previously Used Categories: {previousCategories}

Generate a NEW category with:
- Complexity: {complexity} (1-Way, 2-Way, or 3-Way)
- MUST be applicable to at least one remaining position
- MUST NOT be used before in this match
- MUST be achievable with historical players

Category Building Blocks (use 1-3 of these):
Identifiers: Jersey #, Jersey Range (1-9, 50-59, 80s), Team Colors
Organizations: Teams, Divisions, Conferences (SEC, Big Ten, Big 12, ACC)
Personnel: Head Coach played for, Draft Round, Undrafted, 1-Team Loyalist, Journeyman (4+ teams)
Timeframes: Decades, Specific Year, Era (Pre-1980, Modern)
Accolades: Heisman, Super Bowl, Pro Bowl, MVP, All-American, DPOY/OPOY
Niche: Dual-Color Matches (LSU→Vikings), Rivalry Bridges (Michigan→Lions), Coach Reunions, Award Discrepancies

Return ONLY valid JSON:
{
  "category": "Specific, creative category name",
  "description": "Human-readable explanation",
  "complexity": "1-Way|2-Way|3-Way",
  "applicablePositions": ["QB", "RB", "WR/TE", "DEF"],
  "reasoning": "Why this category is well-balanced and achievable",
  "historicalExamples": ["Example Player 1", "Example Player 2", "Example Player 3"]
}
`;

export const PLAYER_STAT_LOG_PROMPT = `You are a football statistics expert.

Player: {playerName}
Position: {position}
Evaluation Scope: {scope}

Compile the player's statistics, prioritizing the selected evaluation scope at the top:

1. PRIMARY STATS (for selected scope)
2. CAREER HIGHLIGHTS
3. AWARDS & ACHIEVEMENTS
4. NOTABLE RECORDS

Format as JSON:
{
  "playerName": "Name",
  "position": "Position",
  "scope": "Evaluation Scope Used",
  "primaryStats": {
    "stat1": value,
    "stat2": value
  },
  "careerHighlights": {
    "bestSeason": "Year",
    "stats": "Brief summary"
  },
  "awardsAchievements": ["Award1", "Award2"],
  "notableRecords": ["Record1", "Record2"]
}
`;
