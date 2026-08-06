import { NextResponse } from 'next/server'
import { callLLM } from '@/lib/llm'

export async function POST(req: Request) {
  const body = await req.json()
  const { roster, evaluation_scope, category_context } = body
  const evaluation = await callLLM('roster_grading_and_scoring', { roster, evaluation_scope, category_context })
  return NextResponse.json(evaluation)
}
