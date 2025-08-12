import { NextResponse } from "next/server"
import { redis } from "@/lib/redis"

export const dynamic = "force-dynamic"

export async function GET() {
  // Upstash REST doesn't have KEYS, but supports SCAN via cursor in redis-compat API.
  // For simplicity, list known keys we use.
  const keys = [
    "content:profile",
    "content:featured",
    "content:projects",
    "content:about",
    "audit:entries",
  ]
  const map: Record<string, boolean> = {}
  for (const k of keys) {
    const exists = await redis.exists(k)
    map[k] = exists === 1
  }
  return NextResponse.json(map)
}
