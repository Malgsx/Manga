import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  const present = (name: string) => {
    const v = process.env[name]
    return typeof v === "string" && v.length > 0
  }
  return NextResponse.json({
    upstash: {
      url: present("UPSTASH_REDIS_REST_URL"),
      token: present("UPSTASH_REDIS_REST_TOKEN"),
    },
    blob: {
      token: present("BLOB_READ_WRITE_TOKEN") || present("BLOB_READ_ONLY_TOKEN"),
    },
    node: process.version,
  })
}
