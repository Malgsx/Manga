import { NextResponse } from "next/server"
import { getSection, setSection, type FeaturedData } from "@/lib/storage"
import { logAudit } from "@/lib/audit"

const defaultFeatured: FeaturedData = {
  showcaseImage: "/placeholder.svg?height=200&width=300",
  featuredTitle: "FEATURED PROJECT",
  featuredDescription: "An immersive manga reading experience with advanced features and beautiful design",
  demoUrl: "https://github.com/Malgsx/manga-portfolio",
  sourceCodeUrl: "https://github.com/Malgsx/manga-portfolio",
  technologies: ["NEXT.JS", "TYPESCRIPT", "TAILWIND CSS", "FRAMER MOTION"],
  keyFeatures: [
    "RESPONSIVE MANGA READER INTERFACE",
    "BOOKMARK AND PROGRESS TRACKING",
    "DARK/LIGHT MODE SUPPORT",
    "OFFLINE READING CAPABILITIES",
    "SOCIAL SHARING FEATURES",
  ],
}

export const dynamic = "force-dynamic"

export async function GET() {
  const data = await getSection<FeaturedData>("content:featured", defaultFeatured)
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<FeaturedData>
  const current = await getSection<FeaturedData>("content:featured", defaultFeatured)
  const next = { ...current, ...body }
  await setSection("content:featured", next)
  await logAudit("featured.update", { fields: Object.keys(body || {}) })
  return NextResponse.json(next)
}
