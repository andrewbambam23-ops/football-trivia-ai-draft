// src/lib/llm-cache.ts
import { callLLM } from './llm'
import { getCached, setCached } from './redis'

export async function callLLMWithCache(promptName: string, payload: any, ttl = 300) {
  const key = `llm:${promptName}:${Buffer.from(JSON.stringify(payload)).toString('base64')}`
  const cached = await getCached(key)
  if (cached) return cached
  const resp = await callLLM(promptName, payload)
  await setCached(key, resp, ttl)
  return resp
}
