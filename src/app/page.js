'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Fine art pieces data
const artPieces = [
  {
    id: 1,
    title: "Girl with Bunny",
    year: "2025",
    medium: "Oil on Wood",
    dimensions: "12x16 inches",
    image: "/textures/art-girl-bunny01.jpg",
    thumbnail: "/textures/art-girl-bunny01-th.jpg",
    description: "A contemporary artwork exploring themes of identity and whimsy."
  },
  {
    id: 2,
    title: "Boy with Bunny",
    year: "2025",
    medium: "Oil on Wood",
    dimensions: "12x12 inches",
    image: "/textures/art-boy-bunny01.JPG",
    thumbnail: "/textures/art-boy-bunny01-th.JPG",
    description: "A contemporary artwork exploring themes of identity and whimsy."
  },
  {
    id: 3,
    title: "Standing in a Wheat Field",
    year: "2025",
    medium: "Oil on Matte",
    dimensions: "5x7 inches",
    image: "/textures/standing-wheat.JPG",
    thumbnail: "/textures/standing-wheat-th.JPG",
    description: "A contemporary artwork exploring themes of nature and rural life."
  },
  {
    id: 4,
    title: "Cornfield",
    year: "2025",
    medium: "Oil on Wood",
    dimensions: "12x16 inches",
    image: "/textures/cornfield.jpg",
    thumbnail: "/textures/cornfield-th.jpg",
    description: "A contemporary artwork exploring themes of agriculture and rural landscapes."
  },
  {
    id: 5,
    title: "Standing Boy with Bunny",
    year: "2025",
    medium: "Oil on Wood",
    dimensions: "12x16 inches",
    image: "/textures/StandingBoyBunny.jpg",
    thumbnail: "/textures/StandingBoyBunny1024.jpg",
    description: "A contemporary artwork exploring themes of identity and whimsy."
  },
  {
    id: 6,
    title: "Crow",
    year: "2025",
    medium: "Oil on Wood",
    dimensions: "5x7 inches",
    image: "/textures/crow.jpg",
    thumbnail: "/textures/crow.jpg",
    description: "A contemporary artwork exploring themes of nature and wildlife."
  }
]

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Ensure component is mounted before starting animations
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    if (!isMounted || isHovered) return // Don't start until mounted, pause on hover
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % artPieces.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isMounted, isHovered])

  const currentPiece = artPieces[currentIndex]

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
      {/* Centered Carousel */}
      <div 
        className="flex flex-col items-center justify-center flex-1 w-full px-4 py-20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentPiece.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="max-w-2xl w-full"
          >
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={currentPiece.image}
                alt={currentPiece.title}
                fill
                className="object-contain"
                priority={currentIndex === 0}
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Painting Info */}
        <motion.div
          key={`info-${currentPiece.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 text-center space-y-2"
        >
          <h2 className="text-xl md:text-2xl font-light text-gray-900 tracking-wide font-headline">
            {currentPiece.title}
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-light">
            {currentPiece.year} • {currentPiece.medium} • {currentPiece.dimensions}
          </p>
        </motion.div>
      </div>

      {/* Social Media Icons */}
      <div className="pb-12 flex items-center justify-center gap-6">
        <a
          href="https://www.instagram.com/lawnwalker/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
          aria-label="Instagram"
        >
          <svg
            className="w-6 h-6 md:w-7 md:h-7"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
      </div>
    </main>
  )
}