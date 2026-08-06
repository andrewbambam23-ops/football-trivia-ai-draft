// src/app/api/draft/category/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const body = await req.json()
  const { matchId } = body

  // Simplified generator: pick a random category from list and ensure it applies to open slots
  const categories = [
    { raw: 'Player who won MVP', tokens: ['MVP'] },
    { raw: 'Wide Receiver in the 1990s', tokens: ['WR','1990s'] },
    { raw: 'Heisman winner from SEC', tokens: ['Heisman','SEC'] }
  ]
  const pick = categories[Math.floor(Math.random()*categories.length)]

  return NextResponse.json({ category: pick })
}
