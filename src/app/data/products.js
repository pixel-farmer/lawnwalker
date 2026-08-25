/**
 * Single source of truth for all artwork and shop products.
 *
 * productType:
 *   'original' — one-of-one; quantity is 0 (sold/unavailable) or 1 (available)
 *   'print'    — reproducible; quantity is stock count, or null for open edition
 *
 * status: 'available' | 'sold' | 'not_for_sale'
 * price is in cents (87500 = $875.00). null when not for sale.
 */

export const PRODUCT_TYPE = {
  ORIGINAL: 'original',
  PRINT: 'print',
}

/** Default max qty in cart for open-edition prints (no stock tracking yet). */
const OPEN_EDITION_CART_MAX = 10

export const products = [
  {
    id: 1,
    slug: 'girl-with-bunny',
    productType: PRODUCT_TYPE.ORIGINAL,
    title: 'Girl with Bunny',
    price: 87500,
    medium: 'Oil on Wood',
    dimensions: '12x16 inches',
    year: '2025',
    description:
      'A contemporary artwork exploring themes of identity and whimsy.',
    images: ['/textures/art-girl-bunny01.jpg'],
    thumbnail: '/textures/art-girl-bunny01-th.jpg',
    status: 'not_for_sale',
    quantity: 1,
    featured: true,
    stripePriceId: null,
  },
  {
    id: 2,
    slug: 'boy-with-bunny',
    productType: PRODUCT_TYPE.ORIGINAL,
    title: 'Boy with Bunny',
    price: 75000,
    medium: 'Oil on Wood',
    dimensions: '12x12 inches',
    year: '2025',
    description:
      'A contemporary artwork exploring themes of identity and whimsy.',
    images: ['/textures/art-boy-bunny01.JPG'],
    thumbnail: '/textures/art-boy-bunny01-th.JPG',
    status: 'not_for_sale',
    quantity: 1,
    featured: true,
    stripePriceId: null,
  },
  {
    id: 3,
    slug: 'standing-in-a-wheat-field',
    productType: PRODUCT_TYPE.ORIGINAL,
    title: 'Standing in a Wheat Field',
    price: 35000,
    medium: 'Oil on Matte',
    dimensions: '5x7 inches',
    year: '2025',
    description:
      'A contemporary artwork exploring themes of nature and rural life.',
    images: ['/textures/standing-wheat.JPG'],
    thumbnail: '/textures/standing-wheat-th.JPG',
    status: 'not_for_sale',
    quantity: 1,
    featured: true,
    stripePriceId: null,
  },
  {
    id: 4,
    slug: 'cornfield',
    productType: PRODUCT_TYPE.ORIGINAL,
    title: 'Cornfield',
    price: 87500,
    medium: 'Oil on Wood',
    dimensions: '12x16 inches',
    year: '2025',
    description:
      'A contemporary artwork exploring themes of agriculture and rural landscapes.',
    images: ['/textures/cornfield.jpg'],
    thumbnail: '/textures/cornfield-th.jpg',
    status: 'not_for_sale',
    quantity: 1,
    featured: true,
    stripePriceId: null,
  },
  {
    id: 5,
    slug: 'standing-boy-with-bunny',
    productType: PRODUCT_TYPE.ORIGINAL,
    title: 'Standing Boy with Bunny',
    price: 87500,
    medium: 'Oil on Wood',
    dimensions: '12x16 inches',
    year: '2025',
    description:
      'A contemporary artwork exploring themes of identity and whimsy.',
    images: ['/textures/StandingBoyBunny.jpg'],
    thumbnail: '/textures/StandingBoyBunny1024.jpg',
    status: 'not_for_sale',
    quantity: 1,
    featured: true,
    stripePriceId: null,
  },
  {
    id: 6,
    slug: 'crow',
    productType: PRODUCT_TYPE.ORIGINAL,
    title: 'Crow',
    price: 35000,
    medium: 'Oil on Wood',
    dimensions: '5x7 inches',
    year: '2025',
    description:
      'A contemporary artwork exploring themes of nature and wildlife.',
    images: ['/textures/crow.jpg'],
    thumbnail: '/textures/crow.jpg',
    status: 'not_for_sale',
    quantity: 1,
    featured: true,
    stripePriceId: null,
  },
  {
    id: 7,
    slug: 'octo-man',
    productType: PRODUCT_TYPE.ORIGINAL,
    title: 'Octo-Man (Commission)',
    price: null,
    medium: 'Acrylic on Wood',
    dimensions: '11x14 inches',
    year: '2025',
    description: '',
    images: ['/textures/octo-man1024.jpg'],
    thumbnail: '/textures/octo-man1024.jpg',
    status: 'not_for_sale',
    quantity: 0,
    featured: false,
    stripePriceId: null,
  },
  {
    id: 8,
    slug: 'lotus-eater',
    productType: PRODUCT_TYPE.ORIGINAL,
    title: 'Lotus Eater',
    price: 45000,
    medium: 'Oil on Wood',
    dimensions: '6x6 inches',
    year: '2026',
    description: '',
    images: ['/textures/Lotus-Eater.jpg'],
    thumbnail: '/textures/Lotus-Eater.jpg',
    status: 'not_for_sale',
    quantity: 1,
    featured: false,
    stripePriceId: null,
  },
  {
    id: 9,
    slug: 'blue-ribbons',
    productType: PRODUCT_TYPE.ORIGINAL,
    title: 'Blue Ribbons',
    price: 87500,
    medium: 'Oil on Wood',
    dimensions: '12x16 inches',
    year: '2026',
    description: '',
    images: ['/textures/BlueRibbons.jpg'],
    thumbnail: '/textures/BlueRibbons.jpg',
    status: 'not_for_sale',
    quantity: 1,
    featured: false,
    stripePriceId: null,
  },
  {
    id: 10,
    slug: 'stripe-test',
    productType: PRODUCT_TYPE.PRINT,
    title: 'Stripe Test Product',
    price: 100,
    medium: 'Test Product',
    dimensions: 'N/A',
    year: '2026',
    description: 'Temporary product for testing Stripe checkout and order fulfillment.',
    images: ['/textures/test-product.jpg'],
    thumbnail: '/textures/test-product.jpg',
    status: 'available',
    quantity: null,
    featured: false,
    stripePriceId: null,
  },

  /*
   * Future print example (uncomment when ready):
   *
   * {
   *   id: 10,
   *   slug: 'girl-with-bunny-print',
   *   productType: PRODUCT_TYPE.PRINT,
   *   title: 'Girl with Bunny — Archival Print',
   *   price: 8500,
   *   medium: 'Archival giclée print',
   *   dimensions: '8x10 inches',
   *   year: '2025',
   *   description: 'Museum-quality reproduction of the original painting.',
   *   images: ['/textures/art-girl-bunny01.jpg'],
   *   thumbnail: '/textures/art-girl-bunny01-th.jpg',
   *   status: 'available',
   *   quantity: null, // null = open edition; or set a number for limited runs
   *   featured: false,
   *   stripePriceId: null,
   * },
   */
]

export function getProductById(id) {
  return products.find((product) => product.id === id)
}

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug)
}

export function isOriginal(product) {
  return product?.productType === PRODUCT_TYPE.ORIGINAL
}

export function isPrint(product) {
  return product?.productType === PRODUCT_TYPE.PRINT
}

/** One-of-one original artwork. */
export function isOneOfOne(product) {
  return isOriginal(product)
}

export function allowsQuantityEdit(product) {
  return isPrint(product) && getMaxQuantity(product) > 1
}

export function getProductTypeLabel(product) {
  if (isPrint(product)) return 'Print'
  if (isOriginal(product)) return 'Original'
  return ''
}

export function getPrimaryImage(product) {
  return product.images[0]
}

export function getDetailImages(product) {
  return product.images.slice(1)
}

export function isShopCatalogProduct(product) {
  return product?.status === 'available' || product?.status === 'sold'
}

export function getCarouselImage(product) {
  return product.thumbnail || product.images[0]
}

export function isPurchasable(product) {
  if (!product || product.status !== 'available' || product.price == null) {
    return false
  }

  if (isOriginal(product)) {
    return product.quantity === 1
  }

  if (isPrint(product)) {
    return product.quantity == null || product.quantity > 0
  }

  return false
}

export function getShopProducts() {
  return products.filter(isPurchasable)
}

/** All pieces listed on the shop page (available + sold). */
export function getShopCatalogProducts() {
  return products.filter(isShopCatalogProduct)
}

export function getShopOriginals() {
  return getShopCatalogProducts().filter(isOriginal)
}

export function getShopPrints() {
  return getShopCatalogProducts().filter(isPrint)
}

/** @deprecated use getShopProducts */
export function getAvailableProducts() {
  return getShopProducts()
}

export function getGalleryProducts() {
  return products.filter(isOriginal)
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured)
}

export function formatPrice(cents) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100)
}

export function getStatusLabel(product) {
  if (product.status === 'sold') return 'Sold'
  if (product.status === 'not_for_sale') return 'Not for sale'
  if (isPurchasable(product)) return formatPrice(product.price)
  return 'Unavailable'
}

export function getMaxQuantity(product) {
  if (!isPurchasable(product)) return 0

  if (isOriginal(product)) {
    return 1
  }

  if (isPrint(product)) {
    if (product.quantity == null) return OPEN_EDITION_CART_MAX
    return product.quantity
  }

  return 0
}
