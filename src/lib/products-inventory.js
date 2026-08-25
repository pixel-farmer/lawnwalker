import {
  getProductBySlug,
  getShopCatalogProducts,
} from '@/app/data/products'
import { mergeProductInventory } from '@/lib/product-status'
import { getSoldInventoryMap } from '@/lib/inventory'

export async function getShopCatalogProductsWithInventory() {
  const inventoryMap = await getSoldInventoryMap()
  return getShopCatalogProducts().map((product) =>
    mergeProductInventory(product, inventoryMap)
  )
}

export async function getProductBySlugWithInventory(slug) {
  const product = getProductBySlug(slug)
  if (!product) return null

  const inventoryMap = await getSoldInventoryMap()
  return mergeProductInventory(product, inventoryMap)
}
