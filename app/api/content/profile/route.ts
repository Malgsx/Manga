import { NextResponse } from "next/server"
import { getSection, setSection, type ProfileData } from "@/lib/storage"
import { logAudit } from "@/lib/audit"

const defaultProfile: ProfileData = {
  profileImage: "/placeholder.svg?height=100&width=100",
  name: "Manga Dev",
  bio: "Full-stack developer with a passion for manga and comic book aesthetics",
  githubUrl: "https://github.com/Malgsx",
  twitterUrl: "https://x.com/MalGsx",
  substackUrl: "https://mal7.substack.com/",
}

export const dynamic = "force-dynamic"

export async function GET() {
  const data = await getSection<ProfileData>("content:profile", defaultProfile)
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<ProfileData>
  const current = await getSection<ProfileData>("content:profile", defaultProfile)
  const next = { ...current, ...body }
  await setSection("content:profile", next)
  await logAudit("profile.update", { keys: Object.keys(body || {}) })
  return NextResponse.json(next)
}
