'use client'

import Image from 'next/image'
import { useState } from 'react'
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
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <>
      <main className="min-h-screen bg-white" style={{ backgroundColor: '#ffffff' }}>
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 p-6 md:p-12 pt-24 md:pt-32 bg-white" style={{ backgroundColor: '#ffffff' }}>
          {artPieces.map((piece, index) => (
            <motion.div
              key={piece.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(piece)}
            >
              <div className="relative overflow-hidden bg-white mb-4">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={piece.thumbnail || piece.image}
                    alt={piece.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-light text-gray-700 tracking-wide">{piece.title}</h3>
                <p className="text-xs text-gray-500 font-light">{piece.year} • {piece.medium}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Modal for enlarged view */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-6xl max-h-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-white">
                <div className="relative w-full h-auto max-h-[85vh]">
                  <Image
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    width={1200}
                    height={1600}
                    className="w-full h-auto max-h-[85vh] object-contain"
                    priority
                  />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-2">
                        {selectedImage.title}
                      </h2>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>{selectedImage.year}</span>
                        <span>•</span>
                        <span>{selectedImage.medium}</span>
                        <span>•</span>
                        <span>{selectedImage.dimensions}</span>
                      </div>
                      {selectedImage.description && (
                        <p className="text-sm text-gray-600 mt-3 font-light max-w-2xl">
                          {selectedImage.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 md:p-3 transition-all z-10"
                aria-label="Close"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}