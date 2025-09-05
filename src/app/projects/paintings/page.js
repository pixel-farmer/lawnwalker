'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function PaintingsLanding() {
  return (
    <main className="flex flex-col items-center min-h-screen mt-10 mr-20">
      <Link href="/projects/paintings/viewproject" passHref>
        <div className="group hover:scale-105 transition-transform duration-300 cursor-pointer bg-white p-4 rounded-lg">
          <img
            src="/textures/art-girl-bunny01-th.jpg"
            alt="Paintings Thumbnail"
            className="rounded-lg shadow-lg object-contain"
            style={{ width: '700px', height: '700px' }}
          />
        </div>
      </Link>
    </main>
  )
}
