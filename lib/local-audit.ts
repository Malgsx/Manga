import fs from 'fs/promises'
import path from 'path'

export type AuditEntry = {
  id: string
  ts: number
  action: string
  meta?: Record<string, unknown>
}

const DATA_DIR = path.join(process.cwd(), 'data')
const AUDIT_FILE = path.join(DATA_DIR, 'audit.json')
const MAX_ENTRIES = 500

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

// Load audit entries from file
async function loadAuditEntries(): Promise<AuditEntry[]> {
  try {
    await ensureDataDir()
    const data = await fs.readFile(AUDIT_FILE, 'utf-8')
    return JSON.parse(data) || []
  } catch {
    return []
  }
}

// Save audit entries to file
async function saveAuditEntries(entries: AuditEntry[]): Promise<void> {
  await ensureDataDir()
  await fs.writeFile(AUDIT_FILE, JSON.stringify(entries, null, 2))
}

export async function logAudit(action: string, meta?: Record<string, unknown>) {
  try {
    const entry: AuditEntry = {
      id: crypto.randomUUID(),
      ts: Date.now(),
      action,
      meta,
    }
    
    const entries = await loadAuditEntries()
    
    // Add new entry to the beginning
    entries.unshift(entry)
    
    // Trim to max entries
    if (entries.length > MAX_ENTRIES) {
      entries.splice(MAX_ENTRIES)
    }
    
    await saveAuditEntries(entries)
  } catch (e) {
    console.error('Local audit log error:', e)
  }
}

export async function getAudit(limit = 100): Promise<AuditEntry[]> {
  try {
    const entries = await loadAuditEntries()
    return entries.slice(0, Math.max(0, limit))
  } catch {
    return []
  }
}
