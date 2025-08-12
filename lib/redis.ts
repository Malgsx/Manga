import { Redis } from "@upstash/redis"

// Function to convert TCP Redis URL to REST API URL
function convertToRestUrl(url: string): string {
  // If it's already a REST URL (https://), return as is
  if (url.startsWith('https://')) {
    return url
  }
  
  // If it's a TCP URL (redis:// or rediss://), convert to REST format
  if (url.startsWith('redis://') || url.startsWith('rediss://')) {
    // Extract host from the TCP URL
    // Format: redis://default:token@host:port or rediss://default:token@host:port
    const match = url.match(/:\/\/(?:default:)?([^@]+@)?([^:\/]+)/)
    if (match && match[2]) {
      return `https://${match[2]}`
    }
  }
  
  return url
}

// Function to extract token from TCP Redis URL if needed
function extractTokenFromUrl(url: string): string | null {
  if (url.startsWith('redis://') || url.startsWith('rediss://')) {
    // Format: redis://default:token@host:port
    const match = url.match(/:\/\/default:([^@]+)@/)
    if (match && match[1]) {
      return match[1]
    }
  }
  return null
}

// Prioritize explicit REST API environment variables
let url = process.env.UPSTASH_REDIS_REST_URL
let token = process.env.UPSTASH_REDIS_REST_TOKEN

// If REST API vars not available, try to convert from other formats
if (!url || !token) {
  const fallbackUrl = process.env.REDIS_URL || process.env.KV_URL || process.env.KV_REST_API_URL
  const fallbackToken = process.env.KV_REST_API_TOKEN || process.env.KV_REST_API_READ_ONLY_TOKEN
  
  if (fallbackUrl) {
    url = convertToRestUrl(fallbackUrl)
    // Try to extract token from URL if not provided separately
    if (!token && !fallbackToken) {
      token = extractTokenFromUrl(fallbackUrl)
    } else if (fallbackToken) {
      token = fallbackToken
    }
  }
}

let client: Redis
if (url && token && url.startsWith('https://')) {
  console.log('Using Redis with REST URL:', url.substring(0, 30) + '...')
  client = new Redis({ url, token })
} else if (url && token) {
  console.error('Invalid Redis URL format. Expected https:// but got:', url.substring(0, 20) + '...')
  // Fallback to fromEnv() which might work in some cases
  client = Redis.fromEnv()
} else {
  console.log('Using Redis.fromEnv() fallback')
  client = Redis.fromEnv()
}

export const redis = client
