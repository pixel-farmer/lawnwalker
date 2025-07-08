export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white px-6">
      {/* Hero Container */}
      <section className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide leading-tight mb-6">
          Crafting digital stories<br />that resonate.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Designing beautiful, functional websites and experiences.
        </p>
        <a
          href="#projects"
          className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition"
        >
          See My Work
        </a>
      </section>
    </main>
  )
}
