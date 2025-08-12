import { NextResponse } from "next/server"
import { getAudit } from "@/lib/audit"

export async function GET() {
  const entries = await getAudit(100)
  return NextResponse.json(entries)
}
