"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { IfEdit, useEditMode } from "@/components/edit-mode-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github, Star, Plus, Upload, Edit2 } from "lucide-react"

type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: { name: string; class: string }[]
  stars: number
  repo: string
}

const initialProjects: Project[] = [
  {
    id: 1,
    title: "Manga Reader App",
    description: "A responsive manga reader with bookmarking and chapter tracking",
    image: "/placeholder.svg?height=200&width=400",
    tags: [
      { name: "Next.js", class: "tech-nextjs" },
      { name: "TypeScript", class: "tech-typescript" },
      { name: "Tailwind", class: "tech-tailwind" },
    ],
    stars: 124,
    repo: "https://github.com/Malgsx/manga-reader-app",
  },
  {
    id: 2,
    title: "Comic Creator",
    description: "Tool for creating your own manga-style comics with AI assistance",
    image: "/placeholder.svg?height=200&width=400",
    tags: [
      { name: "React", class: "tech-react" },
      { name: "JavaScript", class: "tech-javascript" },
      { name: "Node.js", class: "tech-node" },
    ],
    stars: 89,
    repo: "https://github.com/Malgsx/comic-creator",
  },
  {
    id: 3,
    title: "Anime Tracker",
    description: "Keep track of your favorite anime series and get notifications",
    image: "/placeholder.svg?height=200&width=400",
    tags: [
      { name: "Vue.js", class: "tech-vue" },
      { name: "Firebase", class: "tech-firebase" },
      { name: "CSS", class: "tech-css" },
    ],
    stars: 56,
    repo: "https://github.com/Malgsx/anime-tracker",
  },
  {
    id: 4,
    title: "Manga Style Portfolio",
    description: "A customizable portfolio template with manga aesthetics",
    image: "/placeholder.svg?height=200&width=400",
    tags: [
      { name: "HTML", class: "tech-html" },
      { name: "JavaScript", class: "tech-javascript" },
      { name: "CSS", class: "tech-css" },
    ],
    stars: 42,
    repo: "https://github.com/Malgsx/manga-portfolio",
  },
]

const additionalProjects: Project[] = [
  {
    id: 5,
    title: "Character Generator",
    description: "AI-powered manga character generator with customizable features",
    image: "/placeholder.svg?height=200&width=400",
    tags: [
      { name: "Python", class: "tech-python" },
      { name: "MongoDB", class: "tech-mongodb" },
      { name: "React", class: "tech-react" },
    ],
    stars: 78,
    repo: "https://github.com/Malgsx/character-generator",
  },
  {
    id: 6,
    title: "Story Builder",
    description: "Interactive tool for creating manga storylines and plot structures",
    image: "/placeholder.svg?height=200&width=400",
    tags: [
      { name: "Supabase", class: "tech-supabase" },
      { name: "Next.js", class: "tech-nextjs" },
      { name: "Vercel", class: "tech-vercel" },
    ],
    stars: 63,
    repo: "https://github.com/Malgsx/story-builder",
  },
]

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)

  useEffect(() => {
    fetch('/api/content/projects', { cache: 'no-store' }).then(async (res) => {
      const data = await res.json()
      if (Array.isArray(data) && data.length) {
        setProjects(data)
      }
    }).catch(() => {})
  }, [])

  const saveProjects = async (list: Project[]) => {
    await fetch('/api/content/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(list)
    })
  }
  const { addSaver, markDirty } = useEditMode()
  const [showingAll, setShowingAll] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingField, setEditingField] = useState<"image" | "repo" | null>(null)

  const handleShowMore = () => {
    const next = [...initialProjects, ...additionalProjects]
    setProjects(next)
    addSaver(() => saveProjects(next))
    markDirty()
    setShowingAll(true)
  }

  const handleShowLess = () => {
    const next = initialProjects
    setProjects(next)
    addSaver(() => saveProjects(next))
    markDirty()
    setShowingAll(false)
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && editingProject) {
      const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        headers: { 'content-type': file.type },
        body: file
      })
      const data = await res.json()
      if (data.url) {
        setEditingProject({
          ...editingProject,
          image: data.url,
        })
        markDirty()
      }
    }
  }

  const handleSaveProject = () => {
    if (editingProject) {
      setProjects((prevProjects) => {
        const next = prevProjects.map((project) => (project.id === editingProject.id ? editingProject : project))
        addSaver(() => saveProjects(next))
        markDirty()
        return next
      })
      setEditingProject(null)
      setEditingField(null)
    }
  }

  return (
    <div className="bg-black p-8 rounded-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden border-4 border-white dark:border-white bg-black dark:bg-black shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all hover:-translate-y-1 group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover border-b-4 border-white dark:border-white"
              />
              <div className="absolute inset-0 halftone-bg"></div>
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-white text-black dark:bg-white dark:text-black px-3 py-1 border-2 border-white dark:border-white text-xs font-comic font-bold">
                <Star className="h-3 w-3" fill="currentColor" />
                {project.stars}
              </div>

              {/* Edit Image Button */}
              <IfEdit>
                <Button
                  size="icon"
                  className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black hover:bg-gray-200"
                  onClick={() => {
                    setEditingProject(project)
                    setEditingField("image")
                  }}
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </IfEdit>
            </div>

            <CardHeader>
              <h3 className="text-xl font-bold font-comic uppercase tracking-wider text-white">{project.title}</h3>
            </CardHeader>

            <CardContent>
              <p className="font-comic mb-4 font-semibold text-white">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag.name} className={`font-comic font-bold border-2 ${tag.class}`}>
                    {tag.name.toUpperCase()}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex justify-center border-t-4 border-white dark:border-white pt-4 relative group">
              <a
                href={project.repo}
                className="flex items-center gap-1 text-sm font-comic font-bold hover:underline uppercase tracking-wide text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                REPO
              </a>
              
              {/* Edit Repo Button */}
              <IfEdit>
                <Button
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black hover:bg-gray-200"
                  onClick={() => {
                    setEditingProject(project)
                    setEditingField("repo")
                  }}
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
              </IfEdit>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Edit Project Dialog */}
      <Dialog open={!!editingProject} onOpenChange={(open) => !open && (setEditingProject(null), setEditingField(null))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-comic">
              {editingField === "image" ? "Update Project Image" : "Update GitHub Repository URL"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {editingField === "image" && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="project-image" className="font-comic">
                    Upload new image
                  </Label>
                  <Input id="project-image" type="file" accept="image/*" onChange={handleImageChange} />
                  <p className="text-xs">Upload replaces the image and saves in the next step</p>
                </div>
                {editingProject?.image && (
                  <div className="grid gap-2">
                    <Label className="font-comic">Preview</Label>
                    <img
                      src={editingProject.image || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-32 object-cover border-2 border-gray-300 rounded"
                    />
                  </div>
                )}
              </>
            )}
            {editingField === "repo" && (
              <div className="grid gap-2">
                <Label htmlFor="project-repo" className="font-comic">
                  GitHub Repository URL
                </Label>
                <Input
                  id="project-repo"
                  type="url"
                  value={editingProject?.repo || ""}
                  placeholder="https://github.com/username/repo"
                  onChange={(e) =>
                    setEditingProject((prev) => (prev ? { ...prev, repo: e.target.value } : prev))
                  }
                />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setEditingProject(null)
                setEditingField(null)
              }}
              className="font-comic"
            >
              Cancel
            </Button>
            <Button onClick={async () => { handleSaveProject(); addSaver(() => saveProjects(projects)); markDirty(); await saveProjects(projects); }} className="font-comic">
              {editingField === "image" ? "Save Image" : "Save URL"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Show More/Less Button */}
      <div className="mt-8 flex justify-center">
        <div className="comic-panel bg-black border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
          <Button
            onClick={showingAll ? handleShowLess : handleShowMore}
            className="font-comic bg-black text-white border-none hover:bg-gray-800 p-6 text-lg font-bold uppercase tracking-wider"
          >
            {showingAll ? (
              <>SHOW LESS</>
            ) : (
              <>
                <Plus className="mr-2 h-5 w-5" />
                SHOW MORE PROJECTS
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
