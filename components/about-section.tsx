"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { IfEdit, useEditMode } from "@/components/edit-mode-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Pencil } from "lucide-react"

type AboutSection = {
  id: number
  content: string
}

export default function AboutSection() {
  const [aboutSections, setAboutSections] = useState<AboutSection[]>([
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
  ])

  const [editingSection, setEditingSection] = useState<AboutSection | null>(null)
  const [editContent, setEditContent] = useState("")

  useEffect(() => {
    fetch('/api/content/about', { cache: 'no-store' }).then(async (res) => {
      const data = await res.json()
      if (Array.isArray(data) && data.length) {
        setAboutSections(data)
      }
    }).catch(() => {})
  }, [])

  const handleEdit = (section: AboutSection) => {
    setEditingSection(section)
    setEditContent(section.content)
  }

  const saveAbout = async (list: AboutSection[]) => {
    await fetch('/api/content/about', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(list)
    })
  }

  const { addSaver, markDirty } = useEditMode()

  const handleSave = () => {
    if (editingSection) {
      setAboutSections((prev) => {
        const next = prev.map((section: AboutSection) => (
          section.id === editingSection.id ? { ...section, content: editContent } : section
        ))
        addSaver(() => saveAbout(next))
        markDirty()
        return next
      })
      setEditingSection(null)
      setEditContent("")
    }
  }

  const handleCancel = () => {
    setEditingSection(null)
    setEditContent("")
  }

  return (
    <div className="bg-black p-8 rounded-3xl">
      <div className="comic-panel p-6 bg-black dark:bg-black border-4 border-white dark:border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
        <h2 className="text-2xl font-bold mb-4 font-comic uppercase tracking-wider text-white">ABOUT ME</h2>

        <div className="space-y-4">
          {aboutSections.map((section: AboutSection, index: number) => (
            <div
              key={section.id}
              className={`speech-bubble relative bg-black dark:bg-black p-4 border-3 border-white dark:border-white group ${
                index % 2 === 1 ? "ml-8" : ""
              }`}
            >
              <p className="font-comic font-bold text-white pr-8">{section.content}</p>

              {/* Edit button */}
              <IfEdit>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white hover:bg-gray-200 text-black"
                  onClick={() => handleEdit(section)}
                >
                  <Pencil className="h-3 w-3" />
                </Button>
              </IfEdit>
            </div>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!editingSection} onOpenChange={(open: boolean) => !open && handleCancel()}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-comic">Edit About Me Section</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="content" className="font-comic">
                  Content
                </Label>
                <Textarea
                  id="content"
                  value={editContent}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditContent(e.target.value)}
                  className="min-h-[120px] font-comic"
                  placeholder="Enter your about me content..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancel} className="font-comic bg-transparent">
                Cancel
              </Button>
              <Button onClick={async () => { handleSave(); addSaver(() => saveAbout(aboutSections)); markDirty(); await saveAbout(aboutSections); }} className="font-comic">
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
