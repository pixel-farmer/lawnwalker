'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function CrucibleHousePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12" style={{ backgroundColor: '#ffffff' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full space-y-8"
      >
        <div className="flex items-center justify-center">
          <a
            href="https://www.thecruciblehouse.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:opacity-90 transition-opacity duration-300"
          >
            <Image
              src="/textures/TCH-ss02.jpg"
              alt="Crucible House"
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              priority
            />
          </a>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto text-gray-500 text-base md:text-lg font-light leading-relaxed space-y-4"
        >
          <p>
            If someone had told me I could build an Enterprise Website a year ago, I would have had a good laugh. Just finished the Beta Version of The Crucible House using Cursor and the Claude AI, a community website for visual artists. Currently, working on getting early adopters in there.
          </p>
          <p>
            If you are a non-AI artist with a consistent portfolio of work, hit me up for a free lifetime Founder membership which grants access to be able to Post Commission Jobs, Host Meetups, Post Events, Make Groups (still working on that bit), and Write Articles.
          </p>
          <p>
            This site is by artists for artists to share ideas, tips, resources, post and apply for commission jobs and more. I look forward to working with you in order to grow this into a collaborative space for the arts!
          </p>
        </motion.div>
      </motion.div>
    </main>
  )
}

