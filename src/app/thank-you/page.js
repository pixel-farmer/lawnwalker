'use client'

import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-3xl font-semibold text-cyan-400">Thank You!</h1>
        <p className="text-lg text-gray-300">
          Your message has been sent successfully. I&apos;ll get back to you as soon as I can.
        </p>
        <Link
          href="/"
          className="inline-block bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-3 rounded transition"
        >
          Return Home
        </Link>
      </div>
    </main>
  )
}
