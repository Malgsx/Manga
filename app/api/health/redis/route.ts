import { NextResponse } from "next/server"
import { redis } from "@/lib/redis"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const key = `health:redis:${Date.now()}`
    const value = Math.random().toString(36).slice(2)
    await redis.set(key, value)
    const roundtrip = await redis.get<string>(key)
    await redis.del(key)
    const ok = roundtrip === value
    return NextResponse.json({ ok })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 })
  }
}
