import { NextResponse } from "next/server"
import { redis } from "@/lib/redis"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const key = searchParams.get("key") || ""
  if (!key) return NextResponse.json({ error: "missing key" }, { status: 400 })
  const raw = await redis.get<string>(key)
  return NextResponse.json({ key, raw })
}
