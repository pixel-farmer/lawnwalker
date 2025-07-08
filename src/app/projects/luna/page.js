'use client'

import Link from 'next/link'

export default function LunaProjectPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-6">
      <h1 className="text-5xl md:text-6xl font-bold mb-8">Luna Branding</h1>
      <p className="max-w-2xl text-center text-gray-300 mb-10">
        A complete visual identity project for Luna, a lunar exploration non-profit.
        This includes logo, color system, typography, and digital presence.
      </p>
      <Link href="/" className="text-indigo-400 underline hover:text-indigo-300">
        ← Back to Home
      </Link>
    </main>
  )
}
