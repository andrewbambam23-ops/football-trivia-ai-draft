// src/app/api/trivia/validate/route.ts
import { NextResponse } from 'next/server'
import { callLLM } from '@/lib/llm'

export async function POST(req: Request) {
  const body = await req.json()
  const { question, candidateAnswer } = body
  // placeholder: validate if candidateAnswer matches question
  const validation = await callLLM('trivia_validation', { question, candidateAnswer })
  return NextResponse.json({ validation })
}
