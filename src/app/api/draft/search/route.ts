import { NextResponse } from 'next/server'
import { callLLM } from '@/lib/llm'

export async function POST(req: Request) {
  const body = await req.json()
  const { query, category_tokens, evaluation_scope } = body

  // 1) Call popularity generation prompt
  const candidates = await callLLM('popularity_sorted_candidate_generation', { query, category_tokens, evaluation_scope })

  // 2) Validate top 5 candidates
  const top = Array.isArray(candidates) ? candidates.slice(0, 5) : []
  const validations = await Promise.all(top.map((c: any) =>
    callLLM('dynamic_player_validation', { category: category_tokens?.raw || '', category_tokens, player_candidate: c, evaluation_scope })
  ))

  return NextResponse.json({ candidates, validations })
}
