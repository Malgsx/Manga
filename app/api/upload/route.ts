import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { logAudit } from "@/lib/audit"

export const runtime = "edge"

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const filename = searchParams.get("filename") || `upload-${Date.now()}`
    const contentType = req.headers.get("content-type") || undefined

    // Upload the raw request body directly to Vercel Blob
    const blob = await put(`manga-portfolio/${filename}`, req.body!, {
      access: "public",
      contentType,
      addRandomSuffix: true,
    })

    await logAudit("blob.upload", { filename, url: blob.url })
    return NextResponse.json({ url: blob.url })
  } catch (e) {
    return NextResponse.json({ error: "upload_failed" }, { status: 500 })
  }
}
