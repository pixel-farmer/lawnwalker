'use client'

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-opacity-0 text-white px-6 border-0">
    <section className="max-w-xl w-full px-4" style={{ marginLeft: '500px' }}>
      <h1 className="text-white text-2xl mb-4 mt-8">About Me</h1>
      <p className="${inter.className} font-thin text-gray-300 text-xl leading-relaxed">
        USA-Based designer and developer with a focus on digital art, video design, and creative coding.
        <br/><br/>
Always looking for interesting opportunies to create beautiful digital experiences.
      </p>
    </section>
    </main>
  )
}
