// src/app/api/trivia/generate/route.ts
import { NextResponse } from 'next/server'
import { callLLMWithCache } from '@/lib/llm-cache'

export async function POST(req: Request) {
  const body = await req.json()
  const { context } = body
  // placeholder: call an LLM prompt to generate trivia question(s)
  const q = await callLLMWithCache('trivia_question_generation', { context }, 60)
  return NextResponse.json({ generated: q })
}
