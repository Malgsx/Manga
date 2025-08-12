import { NextResponse } from "next/server"
import { getSection, setSection, type Project } from "@/lib/storage"
import { logAudit } from "@/lib/audit"

const defaultProjects: Project[] = []

export const dynamic = "force-dynamic"

export async function GET() {
  const data = await getSection<Project[]>("content:projects", defaultProjects)
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = (await req.json()) as Project[]
  await setSection("content:projects", body)
  await logAudit("projects.update", { count: Array.isArray(body) ? body.length : 0 })
  return NextResponse.json(body)
}
