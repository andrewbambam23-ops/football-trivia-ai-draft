// src/app/api/draft/search/route.ts
import { NextResponse } from 'next/server'
import { callLLMWithCache } from '@/lib/llm-cache'

export async function POST(req: Request) {
  const body = await req.json()
  const { query, category_tokens, evaluation_scope } = body

  const candidates = await callLLMWithCache('popularity_sorted_candidate_generation', { query, category_tokens, evaluation_scope }, 30)
  const top = Array.isArray(candidates) ? candidates.slice(0, 6) : []
  const validations = await Promise.all(top.map((c:any) =>
    callLLMWithCache('dynamic_player_validation', { category: category_tokens?.raw || '', category_tokens, player_candidate: c, evaluation_scope }, 60)
  ))

  // Merge validations
  const merged = (top || []).map((c:any, idx:number) => ({ ...c, validation: validations[idx]||null }))
  return NextResponse.json({ candidates: merged, validations })
}
