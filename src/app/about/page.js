/* 'use client'

import AnimatedImage from '../components/AnimatedImage.js'

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-opacity-0 text-white px-6">
      <div className="max-w-xl w-full px-4">
        <AnimatedImage
          frameCount={5}
          frameRate={12}
          basePath="/textures/profile/"
          width={300}
          height={300}
        />
        <h1 className="text-white text-2xl mb-4 mt-8">About Me</h1>
        <p className="font-thin text-gray-300 text-xl leading-relaxed">
          USA-Based visual designer and creative developer with a focus on digital art, video and motion design, and creative development.
          <br/><br/>
          Always looking for interesting opportunities to create beautiful digital experiences.
        </p>
      </div>
    </main>
  )
} */

'use client'

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

        {/* 👉 Text on the right */}
        <div className="w-1/2">
          <h1 className="text-white text-2xl mb-4">About Me</h1>
          <p className="font-thin text-gray-300 text-xl leading-relaxed">
            USA-Based visual designer and creative developer with a focus on digital art, video and motion design, and creative development.
            <br /><br />
            Always looking for interesting opportunities to create beautiful digital experiences.
          </p>
        </div>
      </div>
    </main>
  )
}
