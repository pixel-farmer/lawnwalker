import ArtworkCard from '@/app/components/ArtworkCard'

export default function ShopGrid({ products }) {
  if (!products.length) {
    return (
      <p className="text-gray-500 font-light text-lg">
        No artwork is listed in the shop right now.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {products.map((product) => (
        <ArtworkCard key={product.slug} product={product} />
      ))}
    </div>
  )
}
