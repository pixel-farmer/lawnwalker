import ShopCatalog from '@/app/components/ShopCatalog'
import { getShopCatalogProductsWithInventory } from '@/lib/products-inventory'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Shop | Lawn Walker',
  description: 'Original paintings available for purchase.',
}

export default async function ShopPage() {
  const products = await getShopCatalogProductsWithInventory()

  return <ShopCatalog products={products} />
}
