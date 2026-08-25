import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { Pool } from '@neondatabase/serverless'
import { getDatabaseUrl } from '../src/lib/db.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

function loadEnvLocal() {
  try {
    const envPath = join(__dirname, '..', '.env.local')
    const content = readFileSync(envPath, 'utf8')

    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue

      const separatorIndex = trimmed.indexOf('=')
      if (separatorIndex === -1) continue

      const key = trimmed.slice(0, separatorIndex).trim()
      const value = trimmed.slice(separatorIndex + 1).trim()
      if (!process.env[key]) {
        process.env[key] = value
      }
    }
  } catch {
    // Local env file is optional when env vars are already set.
  }
}

loadEnvLocal()

const connectionString = getDatabaseUrl()

if (!connectionString) {
  console.error(
    'Missing database connection string. Set DATABASE_URL (or NEON_DATABASE_URL / NEON_POSTGRES_URL) in your environment.'
  )
  process.exit(1)
}

const schemaPath = join(__dirname, '..', 'db', 'schema.sql')
const schema = readFileSync(schemaPath, 'utf8')
const pool = new Pool({ connectionString })

console.log('Running database migration...')

try {
  await pool.query(schema)
  console.log('Migration complete.')
} finally {
  await pool.end()
}
