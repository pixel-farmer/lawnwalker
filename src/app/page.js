'use client'

import useSound from 'use-sound'

export default function Home() {

  const [playHover] = useSound('/sounds/swipe.mp3')

  return (
    <main className="min-h-screen flex flex-col items-center bg-opacity-0 text-white px-6 border-0">
      {/* Hero Container */}
      <section id="projects" className="max-w-xl w-full px-4" style={{ marginLeft: '600px' }}>
  <h2 className="text-xl md:text-xl mb-4 mt-8 text-left font-thin">
    SELECTED WORK
  </h2>
  <ul className="space-y-2">
    {[
      { title: "I am AVA", href: "/projects/ava" },
      { title: "Pixel Farmer", href: "/projects/pixel" },
      { title: "Portfolio System UI", href: "/projects/system-ui" },
    ].map((project, index) => (
      <li key={index} className="group text-left">
        <a
          href={project.href}
          onMouseEnter={() => playHover()}
          className="text-xl md:text-3xl font-thin text-cyan-500 hover:text-cyan-300  transition duration-300 inline-block transform group-hover:translate-x-2"
        >
          {project.title}
        </a>
      </li>
    ))}
  </ul>
</section>

    </main>
  )
}
