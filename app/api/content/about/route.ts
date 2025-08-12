import { NextResponse } from "next/server"
import { getSection, setSection, type AboutSection } from "@/lib/storage"
import { logAudit } from "@/lib/audit"

const defaultAbout: AboutSection[] = [
  {
    id: 1,
    content:
      "HELLO THERE! I'M A DEVELOPER WITH A PASSION FOR CREATING UNIQUE DIGITAL EXPERIENCES THAT BLEND TECHNOLOGY WITH ARTISTIC EXPRESSION.",
  },
  {
    id: 2,
    content:
      "MY JOURNEY BEGAN WHEN I DISCOVERED THE WORLD OF WEB DEVELOPMENT WHILE STUDYING GRAPHIC DESIGN. I WAS IMMEDIATELY DRAWN TO THE CREATIVE POSSIBILITIES OF CODING.",
  },
  {
    id: 3,
    content:
      "I SPECIALIZE IN FRONT-END DEVELOPMENT WITH A FOCUS ON CREATING IMMERSIVE, INTERACTIVE EXPERIENCES. MY BACKGROUND IN ILLUSTRATION AND MANGA ART INFLUENCES MY APPROACH TO UI/UX DESIGN.",
  },
  {
    id: 4,
    content:
      "WHEN I'M NOT CODING, YOU CAN FIND ME SKETCHING NEW MANGA CHARACTERS, ATTENDING COMIC CONVENTIONS, OR EXPERIMENTING WITH DIGITAL ART TECHNIQUES.",
  },
]

export const dynamic = "force-dynamic"

export async function GET() {
  const data = await getSection<AboutSection[]>("content:about", defaultAbout)
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = (await req.json()) as AboutSection[]
  await setSection("content:about", body)
  await logAudit("about.update", { count: Array.isArray(body) ? body.length : 0 })
  return NextResponse.json(body)
}
