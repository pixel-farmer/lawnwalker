'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row gap-12 md:gap-16"
      >
        {/* Image */}
        <div className="shrink-0 w-full md:w-80 h-80 md:h-96 relative">
          <Image
            src="/textures/profile/pfp.png"
            alt="Lawn Walker"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-tight">
              About
            </h1>
            <div className="space-y-4 text-gray-700 font-light leading-relaxed text-base md:text-lg">
              <p>
                USA-based fine artist working on a new series of oil paintings. My work blends American folk art traditions with modern Lowbrow aesthetics, exploring themes of identity, nature, and rural life.
              </p>
              <p>
                Outside of my fine art practice, I work as a visual designer and creative developer, with experience in digital art, video and motion design, and creative development. I&apos;ve worked on projects for companies like PricewaterhouseCoopers, Fox Searchlight Pictures, and Novartis Healthcare.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="pt-8 border-t border-gray-200">
            <h2 className="text-xl font-light text-gray-900 mb-6">Contact</h2>
            <form
              action="https://formsubmit.co/cassie@pixel-farmers.com"
              method="POST"
              className="space-y-5 max-w-md"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://lawnwalker.vercel.app/thank-you" />

              <div>
                <label className="block text-sm text-gray-600 mb-2 font-light">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-white text-gray-900 border border-gray-300 px-4 py-2.5 rounded focus:outline-none focus:border-gray-500 transition-colors font-light"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2 font-light">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-white text-gray-900 border border-gray-300 px-4 py-2.5 rounded focus:outline-none focus:border-gray-500 transition-colors font-light"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2 font-light">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  className="w-full bg-white text-gray-900 border border-gray-300 px-4 py-2.5 rounded focus:outline-none focus:border-gray-500 transition-colors font-light resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded transition-colors font-light text-sm tracking-wide"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Shop Link */}
          <div className="pt-4">
            <Link 
              href="https://lawnwalker.etsy.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-light underline"
            >
              View Shop →
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
