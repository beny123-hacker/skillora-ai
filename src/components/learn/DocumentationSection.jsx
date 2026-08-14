function DocumentationSection() {
  const documentation = [
    {
      title: "React.js Documentation",
      description: "Official documentation for building modern React applications.",
      category: "Frontend",
      url: "https://react.dev/",
    },
    {
      title: "Node.js Documentation",
      description: "Official Node.js documentation for backend development.",
      category: "Backend",
      url: "https://nodejs.org/docs/latest/api/",
    },
    {
      title: "Python Documentation",
      description: "Official Python documentation, tutorials, and references.",
      category: "Programming",
      url: "https://docs.python.org/3/",
    },
    {
      title: "MongoDB Documentation",
      description: "Learn MongoDB databases, queries, CRUD operations, and more.",
      category: "Database",
      url: "https://www.mongodb.com/docs/",
    },
    {
      title: "Docker Documentation",
      description: "Learn Docker containers, images, commands, and deployment.",
      category: "DevOps",
      url: "https://docs.docker.com/",
    },
    {
      title: "Git Documentation",
      description: "Learn Git version control and manage your projects efficiently.",
      category: "Tools",
      url: "https://git-scm.com/doc",
    },
  ];

  return (
    <section className="w-full">
      <div className="mb-6">
        <span className="text-xs font-semibold tracking-widest text-indigo-400">
          OFFICIAL RESOURCES
        </span>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Documentation 📚
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Explore official documentation and learn directly from trusted
          technology resources.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {documentation.map((doc) => (
          <a
            key={doc.title}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-white/10 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-2xl">
                📖
              </div>

              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
                {doc.category}
              </span>
            </div>

            <h3 className="mt-5 text-lg font-bold text-white group-hover:text-indigo-300">
              {doc.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {doc.description}
            </p>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                Official Documentation
              </span>

              <span className="font-semibold text-indigo-400">
                Read Docs →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default DocumentationSection;