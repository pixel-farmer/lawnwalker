import { getSql } from '@/lib/db'

export { mergeProductInventory, isSoldInInventory } from '@/lib/product-status'

export async function getSoldInventoryMap() {
  const sql = getSql()
  if (!sql) return new Map()

  try {
    const rows = await sql`
      SELECT product_slug, status, sold_at, order_id
      FROM product_inventory
      WHERE status = 'sold'
    `

    return new Map(rows.map((row) => [row.product_slug, row]))
  } catch (error) {
    console.error('Failed to load product inventory:', error)
    return new Map()
  }
}

export async function getSoldSlugs() {
  const inventoryMap = await getSoldInventoryMap()
  return [...inventoryMap.keys()]
}
