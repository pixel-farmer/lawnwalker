export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-opacity-0 text-white px-6 border-0">
      {/* Hero Container */}
      <section id="projects" className="max-w-xl w-full px-4" style={{ marginLeft: '500px' }}>
  <h2 className="text-xl md:text-xl mb-4 mt-8 text-left font-mono">
    SELECTED WORK
  </h2>
  <ul className="space-y-2">
    {[
      { title: "I am AVA", href: "/projects/luna" },
      { title: "Pixel Farmer", href: "/projects/pixel" },
      { title: "Portfolio System UI", href: "/projects/system-ui" },
    ].map((project, index) => (
      <li key={index} className="group text-left">
        <a
          href={project.href}
          className="text-xl md:text-3xl font-light text-orange-300  hover:text-orange-200 transition duration-300 inline-block transform group-hover:translate-x-2"
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
