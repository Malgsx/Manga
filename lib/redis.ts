import { Redis } from "@upstash/redis"

const url = process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_URL || process.env.KV_REST_API_URL
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || process.env.KV_REST_API_READ_ONLY_TOKEN

let client: Redis
if (url && token) {
  client = new Redis({ url, token })
} else {
  client = Redis.fromEnv()
}

export const redis = client
