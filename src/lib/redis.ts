// src/lib/redis.ts
import Redis from 'ioredis'

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'
export const redis = new Redis(redisUrl)

export async function getCached(key: string) {
  const v = await redis.get(key)
  return v ? JSON.parse(v) : null
}

export async function setCached(key: string, value: any, ttlSeconds = 300) {
  await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds)
}
