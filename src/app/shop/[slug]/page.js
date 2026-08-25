import { notFound } from 'next/navigation'
import ArtworkDetail from '@/app/components/ArtworkDetail'
import {
  getProductBySlug,
  getShopCatalogProducts,
  isShopCatalogProduct,
} from '@/app/data/products'
import { getProductBySlugWithInventory } from '@/lib/products-inventory'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return getShopCatalogProducts().map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product || !isShopCatalogProduct(product)) {
    return { title: 'Artwork Not Found | Lawn Walker' }
  }

  return {
    title: `${product.title} | Lawn Walker`,
    description: product.description || `${product.title} — ${product.medium}`,
  }
}

export default async function ArtworkPage({ params }) {
  const { slug } = await params
  const product = await getProductBySlugWithInventory(slug)

  if (!product || !isShopCatalogProduct(getProductBySlug(slug))) {
    notFound()
  }

  return <ArtworkDetail product={product} />
}
