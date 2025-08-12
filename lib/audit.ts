import { redis } from "@/lib/redis"

export type AuditEntry = {
  id: string
  ts: number
  action: string
  meta?: Record<string, unknown>
}

const AUDIT_KEY = "audit:entries"
const MAX_ENTRIES = 500

// Dynamic import for local audit (only in Node.js environment)
async function getLocalAudit() {
  if (typeof window !== 'undefined') return null // Browser environment
  try {
    const localAudit = await import('@/lib/local-audit')
    return localAudit
  } catch {
    return null // If import fails, fall back to Redis
  }
}

export async function logAudit(action: string, meta?: Record<string, unknown>) {
  // Use local audit in development mode with Node.js
  if (process.env.NODE_ENV === 'development') {
    const localAudit = await getLocalAudit()
    if (localAudit) {
      return localAudit.logAudit(action, meta)
    }
  }

  const entry: AuditEntry = {
    id: crypto.randomUUID(),
    ts: Date.now(),
    action,
    meta,
  }
  // push to head and trim to keep list bounded
  await redis.lpush(AUDIT_KEY, JSON.stringify(entry))
  await redis.ltrim(AUDIT_KEY, 0, MAX_ENTRIES - 1)
}

export async function getAudit(limit = 100): Promise<AuditEntry[]> {
  // Use local audit in development mode with Node.js
  if (process.env.NODE_ENV === 'development') {
    const localAudit = await getLocalAudit()
    if (localAudit) {
      return localAudit.getAudit(limit)
    }
  }

  const raw = await redis.lrange<string>(AUDIT_KEY, 0, Math.max(0, limit - 1))
  return raw
    .map((s) => {
      try {
        return JSON.parse(s) as AuditEntry
      } catch {
        return null
      }
    })
    .filter(Boolean) as AuditEntry[]
}
