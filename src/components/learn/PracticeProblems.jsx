import React from "react";
import {
  FaCode,
  FaArrowRight,
  FaExternalLinkAlt,
  FaLaptopCode,
  FaTrophy,
  FaBrain,
  FaFire,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";

function PracticeProblems() {
  const practicePlatforms = [
    {
      title: "LeetCode",
      description:
        "Sharpen your problem-solving skills with algorithms, data structures, coding challenges, and interview preparation.",
      category: "Coding Practice",
      icon: <FaLaptopCode />,
      url: "https://leetcode.com/",
      accent: "yellow",
      level: "Interview Ready",
    },
    {
      title: "HackerRank",
      description:
        "Build practical programming skills through coding challenges, skill assessments, and technology-focused exercises.",
      category: "Coding Practice",
      icon: <FaTrophy />,
      url: "https://www.hackerrank.com/",
      accent: "green",
      level: "Skill Building",
    },
    {
      title: "GeeksforGeeks",
      description:
        "Practice programming, data structures, algorithms, computer science concepts, and technical interview questions.",
      category: "DSA & CS",
      icon: <FaBrain />,
      url: "https://www.geeksforgeeks.org/",
      accent: "emerald",
      level: "Concept Mastery",
    },
    {
      title: "CodeChef",
      description:
        "Challenge yourself with programming problems and improve your competitive coding skills through regular contests.",
      category: "Competitive",
      icon: <FaCode />,
      url: "https://www.codechef.com/",
      accent: "orange",
      level: "Competitive",
    },
    {
      title: "Codeforces",
      description:
        "Solve advanced programming challenges, compete with developers worldwide, and improve your algorithmic thinking.",
      category: "Competitive",
      icon: <FaFire />,
      url: "https://codeforces.com/",
      accent: "purple",
      level: "Advanced",
    },
  ];

  return (
    <section className="practice-section w-full">

      {/* =========================
          PREMIUM HEADER
      ========================= */}

      <div className="practice-header">

        <div>

          <div className="section-eyebrow practice-eyebrow">

            <span className="section-eyebrow-icon">
              <FaChartLine />
            </span>

            <span>PRACTICE • IMPROVE • MASTER</span>

          </div>


          <h2 className="practice-title">
            Turn knowledge into
            <span> real skills.</span>
          </h2>


          <p className="practice-description">
            Learning doesn't stop with videos. Challenge yourself with coding
            problems, strengthen your fundamentals, and build confidence by
            solving real programming challenges.
          </p>

        </div>


        {/* Practice Stats */}

        <div className="practice-overview">

          <div className="practice-overview-icon">
            <FaCode />
          </div>

          <div>

            <span>
              {practicePlatforms.length} Platforms
            </span>

            <strong>
              Practice Without Limits
            </strong>

          </div>

        </div>

      </div>


      {/* =========================
          PRACTICE PLATFORM GRID
      ========================= */}

      <div className="practice-grid">

        {practicePlatforms.map((platform, index) => (

          <a
            key={platform.title}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`practice-card practice-${platform.accent}`}
          >

            {/* Background Number */}

            <span className="practice-number">
              {String(index + 1).padStart(2, "0")}
            </span>


            {/* =========================
                CARD TOP
            ========================= */}

            <div className="practice-card-top">

              <div className="practice-icon">
                {platform.icon}
              </div>


              <div className="practice-external">
                <FaExternalLinkAlt />
              </div>

            </div>


            {/* Category */}

            <div className="practice-category">
              {platform.category}
            </div>


            {/* Title */}

            <h3>
              {platform.title}
            </h3>


            {/* Description */}

            <p>
              {platform.description}
            </p>


            {/* Skill Level */}

            <div className="practice-level">

              <FaCheckCircle />

              <span>
                {platform.level}
              </span>

            </div>


            {/* Divider */}

            <div className="practice-divider" />


            {/* =========================
                FOOTER
            ========================= */}

            <div className="practice-footer">

              <span className="practice-footer-label">
                External Platform
              </span>


              <div className="practice-action">

                Start Practice

                <FaArrowRight />

              </div>

            </div>

          </a>

        ))}

      </div>


      {/* =========================
          BOTTOM PREMIUM BANNER
      ========================= */}

      <div className="practice-bottom-banner">

        <div className="practice-banner-content">

          <div className="practice-banner-icon">
            <FaBrain />
          </div>


          <div>

            <span>
              CONSISTENT PRACTICE
            </span>

            <h3>
              Small challenges. Big improvements.
            </h3>

            <p>
              Build your confidence one problem at a time and transform
              theoretical knowledge into practical problem-solving skills.
            </p>

          </div>

        </div>


        <div className="practice-banner-decoration">
          <span />
          <span />
          <span />
        </div>

      </div>

    </section>
  );
}

export default PracticeProblems;