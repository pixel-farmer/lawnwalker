'use client'

import Link from 'next/link'
import AnimatedImage from '../components/AnimatedImage.js'
import Image from 'next/image' // Add this at the top if not already there

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-opacity-0 text-gray-600 px-6">
      <div className="max-w-5xl w-full px-4 flex flex-row items-start gap-10 mt-[80px]">
        {/* 👈 Image on the left */}
        <div className="shrink-0 w-[300px] h-[300px]">
          <Image
            src="/textures/profile/pfp.png"
            alt="Profile picture"
            width={300}
            height={300}
            className="object-cover rounded-xl"
            priority
          />
        </div>

        {/* 👉 Text and form on the right */}
        <div className="w-1/2">
          <h1 className="text-gray-600 text-2xl mb-4">About Me</h1>
          <p className="font-thin text-gray-600 text-xl leading-relaxed mb-6">
            USA-Based visual designer and creative developer with a focus on digital art, video and motion design, and creative 
            development. Background in corporate and smaller design studios. I've enjoyed working on projects for companies like 
            PricewaterhouseCoopers, Foxsearchlight Pictures, Novartis Healthcare to name a few. 
            <br /><br />
            Also, fine artist working on a new series of paintings.
          </p>

          <h2 className="text-gray-600 text-xl mb-2">Contact Lawn</h2>
          <form
            action="https://formsubmit.co/cassie@pixel-farmers.com"
            method="POST"
            className="space-y-4 max-w-md"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://lawnwalker.vercel.app/thank-you" />

            <div>
              <label className="block text-sm text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full bg-white text-gray-600 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-white text-gray-600 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">Message</label>
              <textarea
                name="message"
                rows="4"
                required
                className="w-full bg-white text-gray-600 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
