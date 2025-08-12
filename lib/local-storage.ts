import fs from 'fs/promises'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

export async function getSection<T>(key: string, fallback: T): Promise<T> {
  try {
    await ensureDataDir()
    const filePath = path.join(DATA_DIR, `${key}.json`)
    
    try {
      const data = await fs.readFile(filePath, 'utf-8')
      return JSON.parse(data) as T
    } catch (fileError) {
      // File doesn't exist or is invalid, return fallback
      return fallback
    }
  } catch (e) {
    console.error('getSection error:', e, 'key:', key)
    return fallback
  }
}

export async function setSection<T>(key: string, value: T): Promise<void> {
  try {
    await ensureDataDir()
    const filePath = path.join(DATA_DIR, `${key}.json`)
    await fs.writeFile(filePath, JSON.stringify(value, null, 2))
  } catch (e) {
    console.error('setSection error:', e, 'key:', key)
    throw e
  }
}
