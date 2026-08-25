import React from "react";
import {
  FaBookOpen,
  FaArrowRight,
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaExternalLinkAlt,
  FaCheckCircle,
} from "react-icons/fa";

function DocumentationSection() {
  const documentation = [
    {
      title: "React.js",
      description:
        "Master modern React development with official guides, APIs, hooks, components, and best practices.",
      category: "Frontend",
      url: "https://react.dev/",
      icon: <FaReact />,
      accent: "blue",
    },
    {
      title: "Node.js",
      description:
        "Explore backend development, runtime APIs, modules, asynchronous programming, and server-side applications.",
      category: "Backend",
      url: "https://nodejs.org/docs/latest/api/",
      icon: <FaNodeJs />,
      accent: "green",
    },
    {
      title: "Python",
      description:
        "Learn Python fundamentals, libraries, syntax, tutorials, and official language references.",
      category: "Programming",
      url: "https://docs.python.org/3/",
      icon: <FaPython />,
      accent: "yellow",
    },
    {
      title: "MongoDB",
      description:
        "Build powerful database applications using collections, queries, CRUD operations, aggregation, and more.",
      category: "Database",
      url: "https://www.mongodb.com/docs/",
      icon: <FaDatabase />,
      accent: "emerald",
    },
    {
      title: "Docker",
      description:
        "Understand containers, images, Docker commands, deployment workflows, and containerized applications.",
      category: "DevOps",
      url: "https://docs.docker.com/",
      icon: <FaDocker />,
      accent: "cyan",
    },
    {
      title: "Git",
      description:
        "Learn version control, branching, commits, repositories, collaboration, and professional development workflows.",
      category: "Developer Tools",
      url: "https://git-scm.com/doc",
      icon: <FaGitAlt />,
      accent: "orange",
    },
  ];

  return (
    <section className="documentation-section w-full">
      {/* =========================
          SECTION HEADER
      ========================= */}

      <div className="documentation-header">
        <div>
          <div className="section-eyebrow">
            <span className="section-eyebrow-icon">
              <FaBookOpen />
            </span>

            <span>OFFICIAL LEARNING RESOURCES</span>
          </div>

          <h2 className="documentation-title">
            Learn from the source.
            <span> Build with confidence.</span>
          </h2>

          <p className="documentation-description">
            Explore official documentation from the technologies powering
            modern software development. Learn concepts directly from trusted
            and authoritative sources.
          </p>
        </div>

        <div className="documentation-status">
          <FaCheckCircle />

          <div>
            <span>Trusted Resources</span>
            <strong>Official Documentation</strong>
          </div>
        </div>
      </div>

      {/* =========================
          DOCUMENTATION GRID
      ========================= */}

      <div className="documentation-grid">
        {documentation.map((doc, index) => (
          <a
            key={doc.title}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`documentation-card documentation-${doc.accent}`}
          >
            {/* Background Number */}

            <span className="documentation-number">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Top */}

            <div className="documentation-card-top">
              <div className="documentation-icon">
                {doc.icon}
              </div>

              <div className="documentation-external">
                <FaExternalLinkAlt />
              </div>
            </div>

            {/* Category */}

            <div className="documentation-category">
              {doc.category}
            </div>

            {/* Content */}

            <h3>{doc.title}</h3>

            <p>
              {doc.description}
            </p>

            {/* Divider */}

            <div className="documentation-divider" />

            {/* Footer */}

            <div className="documentation-footer">
              <div className="documentation-official">
                <FaCheckCircle />

                <span>Official Resource</span>
              </div>

              <div className="documentation-action">
                Read Docs

                <FaArrowRight />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default DocumentationSection;