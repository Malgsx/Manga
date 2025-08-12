"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IfEdit, useEditMode } from "@/components/edit-mode-context"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Github, Twitter } from "lucide-react"

export default function ProfileSection() {
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=100&width=100")
  const [name, setName] = useState("Manga Dev")
  const [bio, setBio] = useState("Full-stack developer with a passion for manga and comic book aesthetics")
  const [isEditing, setIsEditing] = useState(false)

  // Social media links
  const [githubUrl, setGithubUrl] = useState("https://github.com/Malgsx")
  const [twitterUrl, setTwitterUrl] = useState("https://x.com/MalGsx")
  const [substackUrl, setSubstackUrl] = useState("https://mal7.substack.com/")
  const [isEditingSocials, setIsEditingSocials] = useState(false)

  useEffect(() => {
    // load from backend
    fetch('/api/content/profile', { cache: 'no-store' }).then(async (res) => {
      const data = await res.json()
      setProfileImage(data.profileImage)
      setName(data.name)
      setBio(data.bio)
      setGithubUrl(data.githubUrl)
      setTwitterUrl(data.twitterUrl)
      setSubstackUrl(data.substackUrl)
    }).catch(() => {})
  }, [])

  const saveProfile = async () => {
    await fetch('/api/content/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileImage, name, bio, githubUrl, twitterUrl, substackUrl })
    })
  }

  const { addSaver, markDirty } = useEditMode()

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // upload to Vercel Blob via API route
      setUploading(true)
      setProgress(0)
      const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        headers: { 'content-type': file.type },
        body: file
      })
      const data = await res.json()
      if (data.url) {
        setProfileImage(data.url)
        // mark pending save
        addSaver(() => saveProfile())
        markDirty()
      }
      setUploading(false)
      setProgress(100)
    }
  }

  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  return (
    <div className="comic-panel p-6 bg-black dark:bg-black border-4 border-white dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="relative">
          <Avatar className="w-40 h-40 border-4 border-white dark:border-white">
            <AvatarImage src={profileImage || "/placeholder.svg"} alt={name} />
            <AvatarFallback className="font-comic text-3xl">MD</AvatarFallback>
          </Avatar>

          <IfEdit>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full bg-white dark:bg-white text-black dark:text-black hover:bg-gray-200 dark:hover:bg-gray-200"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-comic">Change Profile Picture</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Label htmlFor="picture" className="font-comic">
                  Upload new picture
                </Label>
                <Input id="picture" type="file" accept="image/*" onChange={handleImageChange} />
                 {uploading && (
                   <p className="text-sm text-white">Uploading...</p>
                 )}
              </div>
              </DialogContent>
            </Dialog>
          </IfEdit>
        </div>

        <div className="space-y-4 text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <h2 className="text-2xl font-bold font-comic text-white">{name}</h2>
            <IfEdit>
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                <Pencil className="h-4 w-4" />
              </Button>
            </IfEdit>
          </div>

          <p className="max-w-md font-comic text-white">{bio}</p>

          <div className="flex gap-2 justify-center md:justify-start">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="font-comic bg-black border-white text-white hover:bg-white hover:text-black"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </a>
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="font-comic bg-black border-white text-white hover:bg-white hover:text-black"
              >
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
            </a>
            <a href={substackUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="font-comic bg-black border-white text-white hover:bg-white hover:text-black"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.539 24V10.812H1.46zM22.539 0H1.46v2.836h21.08V0z" />
                </svg>
                Substack
              </Button>
            </a>
            <IfEdit>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditingSocials(true)}
                className="text-white hover:bg-white hover:text-black"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </IfEdit>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-comic">Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="font-comic">
                Name
              </Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio" className="font-comic">
                Bio
              </Label>
              <Input id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={async () => { await saveProfile(); addSaver(() => saveProfile()); markDirty(); setIsEditing(false) }} className="font-comic">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Social Links Dialog */}
      <Dialog open={isEditingSocials} onOpenChange={setIsEditingSocials}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-comic">Edit Social Media Links</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="github" className="font-comic">
                GitHub URL
              </Label>
              <Input
                id="github"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/yourusername"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="twitter" className="font-comic">
                Twitter URL
              </Label>
              <Input
                id="twitter"
                value={twitterUrl}
                onChange={(e) => setTwitterUrl(e.target.value)}
                placeholder="https://twitter.com/yourusername"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="substack" className="font-comic">
                Substack URL
              </Label>
              <Input
                id="substack"
                value={substackUrl}
                onChange={(e) => setSubstackUrl(e.target.value)}
                placeholder="https://yourusername.substack.com"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={async () => { await saveProfile(); addSaver(() => saveProfile()); markDirty(); setIsEditingSocials(false) }} className="font-comic">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
