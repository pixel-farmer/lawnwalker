import Link from 'next/link'

export default function ArtworkNotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-20 text-center">
      <h1 className="text-xl font-bold text-gray-500 tracking-tight font-headline mb-4">
        Artwork not found
      </h1>
      <p className="text-gray-500 font-light mb-8 max-w-md">
        This piece may no longer be listed, or the link may be incorrect.
      </p>
      <Link
        href="/shop"
        className="text-sm text-gray-600 hover:text-gray-900 underline font-light"
      >
        Return to shop
      </Link>
    </main>
  )
}
