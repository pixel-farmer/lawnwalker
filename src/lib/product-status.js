export function mergeProductInventory(product, inventoryMap) {
  if (!product) return product

  const record = inventoryMap?.get(product.slug)
  if (record?.status === 'sold') {
    return {
      ...product,
      status: 'sold',
      quantity: 0,
    }
  }

  return product
}

export function isSoldInInventory(slug, inventoryMap) {
  return inventoryMap?.get(slug)?.status === 'sold'
}

export function mergeProductWithSoldSlugs(product, soldSlugs) {
  if (!product || !soldSlugs?.has(product.slug)) return product

  return mergeProductInventory(product, new Map([[product.slug, { status: 'sold' }]]))
}
