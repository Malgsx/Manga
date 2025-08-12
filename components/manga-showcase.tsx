"use client"

import type React from "react"

import { useEffect, useState } from "react"
import MangaPanelLayout from "./manga-panel-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Github, ExternalLink, Code, Palette, Upload, Pencil } from "lucide-react"
import { IfEdit, useEditMode } from "@/components/edit-mode-context"

export default function MangaShowcase() {
  const [showcaseImage, setShowcaseImage] = useState("/placeholder.svg?height=200&width=300")
  const [featuredTitle, setFeaturedTitle] = useState("FEATURED PROJECT")
  const [featuredDescription, setFeaturedDescription] = useState(
    "An immersive manga reading experience with advanced features and beautiful design",
  )
  const [demoUrl, setDemoUrl] = useState("https://github.com/Malgsx/manga-portfolio")
  const [sourceCodeUrl, setSourceCodeUrl] = useState("https://github.com/Malgsx/manga-portfolio")
  const [technologies, setTechnologies] = useState([
    "NEXT.JS",
    "TYPESCRIPT", 
    "TAILWIND CSS",
    "FRAMER MOTION"
  ])
  const [keyFeatures, setKeyFeatures] = useState([
    "RESPONSIVE MANGA READER INTERFACE",
    "BOOKMARK AND PROGRESS TRACKING", 
    "DARK/LIGHT MODE SUPPORT",
    "OFFLINE READING CAPABILITIES",
    "SOCIAL SHARING FEATURES"
  ])
  const [isEditingCaption, setIsEditingCaption] = useState(false)
  const [isEditingUrls, setIsEditingUrls] = useState(false)
  const [isEditingDetails, setIsEditingDetails] = useState(false)

  useEffect(() => {
    fetch('/api/content/featured', { cache: 'no-store' }).then(async (res) => {
      const data = await res.json()
      setShowcaseImage(data.showcaseImage)
      setFeaturedTitle(data.featuredTitle)
      setFeaturedDescription(data.featuredDescription)
      setDemoUrl(data.demoUrl)
      setSourceCodeUrl(data.sourceCodeUrl)
      setTechnologies(Array.isArray(data.technologies) ? data.technologies : [])
      setKeyFeatures(Array.isArray(data.keyFeatures) ? data.keyFeatures : [])
    }).catch(() => {})
  }, [])

  const saveFeatured = async () => {
    await fetch('/api/content/featured', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        showcaseImage, featuredTitle, featuredDescription, demoUrl, sourceCodeUrl, technologies, keyFeatures
      })
    })
  }

  const { addSaver, markDirty } = useEditMode()

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsEditingDetails(false)
      const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        headers: { 'content-type': file.type },
        body: file
      })
      const data = await res.json()
      if (data.url) {
        setShowcaseImage(data.url)
        addSaver(() => saveFeatured())
        markDirty()
      }
    }
  }

  const handleSaveCaption = async () => {
    setIsEditingCaption(false)
  }

  const topPanelContent = (
    <div className="p-6 h-full flex flex-col justify-center relative group">
      <div className="absolute inset-0 action-lines opacity-20"></div>
      <div className="relative z-10 max-w-4xl">
        <div className="flex items-start gap-2 mb-3">
          <h2 className="text-3xl md:text-4xl font-bold font-comic text-white">{featuredTitle}</h2>
          <IfEdit>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity bg-white hover:bg-gray-200 text-black mt-1"
              onClick={() => setIsEditingCaption(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </IfEdit>
        </div>
        <p className="text-lg md:text-xl font-comic mb-6 text-white leading-relaxed">{featuredDescription}</p>
        <div className="flex flex-wrap gap-4 relative group">
          <a href={demoUrl} target="_blank" rel="noopener noreferrer">
            <Button className="font-comic bg-white text-black hover:bg-gray-200 border-2 border-white">
              <ExternalLink className="mr-2 h-4 w-4" />
              Demo
            </Button>
          </a>
          <a href={sourceCodeUrl} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="font-comic bg-black text-white border-2 border-white hover:bg-white hover:text-black"
            >
              <Github className="mr-2 h-4 w-4" />
              SOURCE CODE
            </Button>
          </a>
          <IfEdit>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity bg-white hover:bg-gray-200 text-black ml-2"
              onClick={() => setIsEditingUrls(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </IfEdit>
        </div>
      </div>
    </div>
  )

  const leftPanelContent = (
    <div className="p-6 h-full flex flex-col group">
      <div className="mb-6">
        <h3 className="text-2xl font-bold font-comic mb-4 uppercase tracking-wider text-white">PROJECT DETAILS</h3>
        <div className="relative">
          <img
            src={showcaseImage || "/placeholder.svg"}
            alt="Manga Reader App"
            className="w-full h-48 object-cover border-4 border-white mb-4"
          />
          <div className="absolute inset-0 halftone-bg"></div>

          {/* Edit Image Button */}
          <Dialog>
            <DialogTrigger asChild>
              <IfEdit>
                <Button
                  size="icon"
                  className="absolute bottom-6 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black hover:bg-gray-200"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </IfEdit>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-comic">Update Showcase Image</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="showcase-image" className="font-comic">
                    Upload new image
                  </Label>
                  <Input id="showcase-image" type="file" accept="image/*" onChange={handleImageChange} />
                 <p className="text-xs text-white/80">Upload replaces the image and saves automatically</p>
                </div>
                {showcaseImage && (
                  <div className="grid gap-2">
                    <Label className="font-comic">Preview</Label>
                    <img
                      src={showcaseImage || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-32 object-cover border-2 border-gray-300 rounded"
                    />
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4 flex-1 relative group">
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold font-comic uppercase tracking-wide text-sm text-white">TECHNOLOGIES USED:</h4>
            <IfEdit>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity bg-white hover:bg-gray-200 text-black h-6 w-6"
                onClick={() => setIsEditingDetails(true)}
              >
                <Pencil className="h-3 w-3" />
              </Button>
            </IfEdit>
          </div>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <Badge key={index} className="font-comic font-bold tech-nextjs border-2">{tech}</Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold font-comic mb-3 uppercase tracking-wide text-sm text-white">KEY FEATURES:</h4>
          <ul className="font-comic space-y-2 text-sm font-bold text-white">
            {keyFeatures.map((feature, index) => (
              <li key={index}>• {feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )

  const topRightPanelContent = (
    <div className="p-6 h-full flex flex-col justify-center items-center text-center relative">
      <div className="absolute inset-0 halftone-bg"></div>
      <div className="relative z-10">
        <Code className="h-16 w-16 mb-4 stroke-[3px] text-white" />
        <h4 className="text-lg font-bold font-comic mb-2 uppercase tracking-wider text-white">CLEAN CODE</h4>
        <p className="font-comic text-sm font-semibold text-white">BUILT WITH MODERN BEST PRACTICES</p>
      </div>
    </div>
  )

  const bottomRightPanelContent = (
    <div className="p-6 h-full flex flex-col justify-center items-center text-center relative">
      <div className="absolute inset-0 halftone-bg"></div>
      <div className="relative z-10">
        <Palette className="h-16 w-16 mb-4 stroke-[3px] text-white" />
        <h4 className="text-lg font-bold font-comic mb-2 uppercase tracking-wider text-white">BEAUTIFUL DESIGN</h4>
        <p className="font-comic text-sm font-semibold text-white">CRAFTED WITH ATTENTION TO DETAIL</p>
      </div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-black p-8 rounded-3xl">
        <MangaPanelLayout
          topPanel={topPanelContent}
          leftPanel={leftPanelContent}
          topRightPanel={topRightPanelContent}
          bottomRightPanel={bottomRightPanelContent}
        />

        {/* Edit Caption Dialog */}
        <Dialog open={isEditingCaption} onOpenChange={setIsEditingCaption}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-comic">Edit Featured Project Caption</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="font-comic">
                  Title
                </Label>
                <Input
                  id="title"
                  value={featuredTitle}
                  onChange={(e) => setFeaturedTitle(e.target.value)}
                  className="font-comic"
                  placeholder="Enter project title..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description" className="font-comic">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={featuredDescription}
                  onChange={(e) => setFeaturedDescription(e.target.value)}
                  className="min-h-[100px] font-comic"
                  placeholder="Enter project description..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditingCaption(false)} className="font-comic">
                Cancel
              </Button>
              <Button onClick={async () => { await saveFeatured(); addSaver(() => saveFeatured()); markDirty(); handleSaveCaption(); }} className="font-comic">
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit URLs Dialog */}
        <Dialog open={isEditingUrls} onOpenChange={setIsEditingUrls}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-comic">Edit Project URLs</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="demo-url" className="font-comic">
                  Demo URL
                </Label>
                <Input
                  id="demo-url"
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  className="font-comic"
                  placeholder="https://your-demo-url.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="source-url" className="font-comic">
                  Source Code URL
                </Label>
                <Input
                  id="source-url"
                  type="url"
                  value={sourceCodeUrl}
                  onChange={(e) => setSourceCodeUrl(e.target.value)}
                  className="font-comic"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditingUrls(false)} className="font-comic">
                Cancel
              </Button>
              <Button onClick={async () => { await saveFeatured(); addSaver(() => saveFeatured()); markDirty(); setIsEditingUrls(false) }} className="font-comic">
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Project Details Dialog */}
        <Dialog open={isEditingDetails} onOpenChange={setIsEditingDetails}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-comic">Edit Project Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="technologies" className="font-comic">
                  Technologies (comma-separated)
                </Label>
                <Input
                  id="technologies"
                  value={technologies.join(", ")}
                  onChange={(e) => setTechnologies(e.target.value.split(", ").map(tech => tech.trim().toUpperCase()))}
                  className="font-comic"
                  placeholder="NEXT.JS, TYPESCRIPT, TAILWIND CSS"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="features" className="font-comic">
                  Key Features (one per line)
                </Label>
                <Textarea
                  id="features"
                  value={keyFeatures.join("\n")}
                  onChange={(e) => setKeyFeatures(e.target.value.split("\n").map(feature => feature.trim().toUpperCase()))}
                  className="min-h-[120px] font-comic"
                  placeholder="RESPONSIVE MANGA READER INTERFACE&#10;BOOKMARK AND PROGRESS TRACKING"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditingDetails(false)} className="font-comic">
                Cancel
              </Button>
              <Button onClick={async () => { await saveFeatured(); addSaver(() => saveFeatured()); markDirty(); setIsEditingDetails(false) }} className="font-comic">
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
