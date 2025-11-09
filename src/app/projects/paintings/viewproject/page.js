'use client'

import Image from 'next/image'
import Link from 'next/link'
import PixelArrow from '../../../components/PixelArrow'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ViewProject() {
  const [selectedImage, setSelectedImage] = useState(null)

  // Fine art pieces
  const artPieces = [
    {
      id: 1,
      title: "Girl with Bunny",
      year: "2025",
      medium: "Oil on Wood",
      dimensions: "12x16 inches",
      image: "/textures/art-girl-bunny01.jpg",
      description: "A contemporary digital artwork exploring themes of identity and whimsy."
    },
    {
      id: 2,
      title: "Boy with Bunny",
      year: "2025",
      medium: "Oil on Wood",
      dimensions: "12x12 inches",
      image: "/textures/art-boy-bunny01.JPG",
      description: "A contemporary digital artwork exploring themes of identity and whimsy."
    },
    {
      id: 3,
      title: "Standing in a Wheat Field",
      year: "2025",
      medium: "Oil on Matte",
      dimensions: "5x7 inches",
      image: "/textures/standing-wheat.JPG",
      description: "A contemporary digital artwork exploring themes of nature and rural life."
    },
    {
      id: 4,
      title: "Cornfield",
      year: "2025",
      medium: "Oil on Wood",
      dimensions: "12x16 inches",
      image: "/textures/cornfield.jpg",
      description: "A contemporary digital artwork exploring themes of agriculture and rural landscapes."
    },
    {
      id: 5,
      title: "Standing Boy with Bunny",
      year: "2025",
      medium: "Oil on Wood",
      dimensions: "12x16 inches",
      image: "/textures/StandingBoyBunny.jpg",
      description: "A contemporary digital artwork exploring themes of identity and whimsy."
    },
    {
      id: 6,
      title: "Crow",
      year: "2025",
      medium: "Oil on Wood",
      dimensions: "5x7 inches",
      image: "/textures/crow.jpg",
      description: "A contemporary digital artwork exploring themes of nature and wildlife."
    }
  ]

  return (
    <main className="min-h-screen flex flex-col items-start text-gray-600 px-8 md:px-2 pt-2 space-y-12">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-xl md:text-xl font-bold text-gray-500 mb-6 tracking-tight font-headline"
      >
        Paintings
      </motion.h1>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
        className="max-w-2xl text-gray-500 text-lg font-thin leading-relaxed"
      >
        <p>A collection of my original paintings, created primarily in oil with select works in acrylic.</p>
      

      
      </motion.div>

      {/* Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        className="w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artPieces.map((piece) => (
            <div 
              key={piece.id} 
              className="group cursor-pointer"
              onClick={() => setSelectedImage(piece)}
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                <Image
                  src={piece.image}
                  alt={piece.title}
                  width={400}
                  height={500}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-gray-600 font-headline">{piece.title}</h3>
                <p className="text-sm text-gray-500">{piece.year}</p>
                <p className="text-sm text-gray-500">{piece.medium}</p>
                <p className="text-sm text-gray-500">{piece.dimensions}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Modal for enlarged view */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-full bg-white rounded-lg overflow-hidden">
            <div className="relative">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                width={800}
                height={1000}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
          </div>
        </div>
      )}

      {/* Back link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
      </motion.div>
    </main>
  )
}
