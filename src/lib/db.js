import { neon, Pool } from '@neondatabase/serverless'

let sqlClient
let poolClient

export function getDatabaseUrl() {
  return (
    process.env.DATABASE_URL ||
    process.env.NEON_DATABASE_URL ||
    process.env.NEON_POSTGRES_URL ||
    process.env.NEON_POSTGRES_PRISMA_URL ||
    null
  )
}

export function getSql() {
  const connectionString = getDatabaseUrl()
  if (!connectionString) return null

  if (!sqlClient) {
    sqlClient = neon(connectionString)
  }

  return sqlClient
}

export function getPool() {
  const connectionString = getDatabaseUrl()
  if (!connectionString) return null

  if (!poolClient) {
    poolClient = new Pool({ connectionString })
  }

  return poolClient
}
