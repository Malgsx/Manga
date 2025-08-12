import { redis } from "@/lib/redis"
import * as localStorage from "@/lib/local-storage"

export type ProfileData = {
  profileImage: string
  name: string
  bio: string
  githubUrl: string
  twitterUrl: string
  substackUrl: string
}

export type FeaturedData = {
  showcaseImage: string
  featuredTitle: string
  featuredDescription: string
  demoUrl: string
  sourceCodeUrl: string
  technologies: string[]
  keyFeatures: string[]
}

export type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: { name: string; class: string }[]
  stars: number
  repo: string
}

export type AboutSection = {
  id: number
  content: string
}

export async function getSection<T>(key: string, fallback: T): Promise<T> {
  // Use local storage in development mode
  if (process.env.NODE_ENV === 'development') {
    return localStorage.getSection(key, fallback)
  }

  let raw: any
  try {
    raw = await redis.get(key)
    if (!raw) return fallback
    
    // If it's already an object, return it directly
    if (typeof raw === 'object') {
      return raw as T
    }
    
    // If it's a string, parse it
    if (typeof raw === 'string') {
      return JSON.parse(raw) as T
    }
    
    return fallback
  } catch (e) {
    console.error('getSection error:', e, 'key:', key, 'raw:', raw)
    return fallback
  }
}

export async function setSection<T>(key: string, value: T): Promise<void> {
  // Use local storage in development mode
  if (process.env.NODE_ENV === 'development') {
    return localStorage.setSection(key, value)
  }

  await redis.set(key, JSON.stringify(value))
}
