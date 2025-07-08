export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-opacity-0 text-white px-6">
      {/* Hero Container */}
      <section id="projects" className="max-w-5xl w-full mx-auto px-4">
  <h2 className="text-3xl md:text-2xl mb-4 -mt-8 text-right font-mono">
    SELECTED WORK
  </h2>
  <ul className="space-y-8">
    {[
      { title: "Visual Identity – Luna", href: "/projects/luna" },
      { title: "E-Commerce Redesign", href: "/projects/shop" },
      { title: "Portfolio System UI", href: "/projects/system-ui" },
    ].map((project, index) => (
      <li key={index} className="group text-right">
        <a
          href={project.href}
          className="text-2xl md:text-4xl font-medium text-white hover:text-indigo-400 transition duration-300 inline-block transform group-hover:translate-x-2"
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
