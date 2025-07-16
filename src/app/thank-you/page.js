'use client'

import { Canvas } from '@react-three/fiber'
import BubbleDistortion from '../../components/BubbleDistortion'

export default function ThankYouPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen mt-10 mr-20">
      <div className="text-center text-white mb-8">
        <h1 className="text-3xl font-semibold text-cyan-400">Thank You!</h1>
        <p className="text-lg text-gray-300 mt-4">
          Your message has been sent successfully. I&apos;ll get back to you as soon as I can.
        </p>
      </div>

    </main>
  )
}
