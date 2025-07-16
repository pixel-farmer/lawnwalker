'use client'

import Link from 'next/link'
import AnimatedImage from '../components/AnimatedImage.js'

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-opacity-0 text-white px-6">
      <div className="max-w-5xl w-full px-4 flex flex-row items-start gap-10 mt-[80px]">
        {/* 👈 Image on the left */}
        <div className="shrink-0 w-[300px] h-[300px]">
          <AnimatedImage
            frameCount={5}
            frameRate={12}
            basePath="/textures/profile/"
            width={300}
            height={300}
          />
        </div>

        {/* 👉 Text and form on the right */}
        <div className="w-1/2">
          <h1 className="text-white text-2xl mb-4">About Me</h1>
          <p className="font-thin text-gray-300 text-xl leading-relaxed mb-6">
            USA-Based visual designer and creative developer with a focus on digital art, video and motion design, and creative development.
            <br /><br />
            Always looking for interesting opportunities to create beautiful digital experiences.
          </p>

          <h2 className="text-white text-xl mb-2">Contact Lawn</h2>
          <form
            action="https://formsubmit.co/cassie@pixel-farmers.com"
            method="POST"
            className="space-y-4 max-w-md"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://lawnwalker.vercel.app/thank-you" />

            <div>
              <label className="block text-sm text-gray-400">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full bg-gray-800 text-white border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-gray-800 text-white border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400">Message</label>
              <textarea
                name="message"
                rows="4"
                required
                className="w-full bg-gray-800 text-white border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
