import React from "react";
import {
  FaYoutube,
  FaBookOpen,
  FaLaptopCode,
  FaExternalLinkAlt,
  FaRobot,
  FaGraduationCap,
  FaStar,
} from "react-icons/fa";

function RecommendedResources({
  roadmapData = null,
}) {
  const resources =
    Array.isArray(roadmapData?.resources)
      ? roadmapData.resources
      : [];

  const aiSuggestion =
    roadmapData?.ai_suggestion ||
    roadmapData?.aiSuggestion ||
    "Keep learning consistently and practice every milestone with real-world projects.";

  return (
    <section className="recommended-resources-section">

      <div className="roadmap-section-heading">

        <div>

          <span className="roadmap-label">
            <FaStar />
            AI CURATED
          </span>

          <h2>
            Recommended
            <span> resources.</span>
          </h2>

          <p>
            Carefully selected resources to support
            your personalized learning journey.
          </p>

        </div>

      </div>

      {resources.length > 0 ? (

        <div className="resources-grid">

          {resources.map(
            (resource, index) => {

              const type =
                resource?.type ||
                "Learning Resource";

              const title =
                resource?.title ||
                `Recommended Resource ${index + 1}`;

              const url =
                resource?.url ||
                "#";

              const lowerType =
                String(type).toLowerCase();

              let Icon =
                FaBookOpen;

              let iconClass =
                "resource-icon-blue";

              if (
                lowerType.includes("youtube") ||
                lowerType.includes("video")
              ) {
                Icon = FaYoutube;
                iconClass =
                  "resource-icon-red";
              } else if (
                lowerType.includes("course")
              ) {
                Icon = FaGraduationCap;
                iconClass =
                  "resource-icon-purple";
              } else if (
                lowerType.includes("coding") ||
                lowerType.includes("practice")
              ) {
                Icon = FaLaptopCode;
                iconClass =
                  "resource-icon-gold";
              }

              return (
                <div
                  className="resource-card"
                  key={`${title}-${index}`}
                >

                  <div
                    className={`resource-icon ${iconClass}`}
                  >
                    <Icon />
                  </div>

                  <div className="resource-type">
                    {type}
                  </div>

                  <h3>
                    {title}
                  </h3>

                  {url !== "#" ? (

                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="resource-link"
                    >
                      Open Resource
                      <FaExternalLinkAlt />
                    </a>

                  ) : (

                    <button
                      type="button"
                      disabled
                      className="resource-link resource-disabled"
                    >
                      Link Unavailable
                    </button>

                  )}

                </div>
              );
            }
          )}

        </div>

      ) : (

        <div className="roadmap-empty-state">

          <div className="empty-state-icon">
            <FaBookOpen />
          </div>

          <h3>
            No Resources Yet
          </h3>

          <p>
            Generate your roadmap to receive
            personalized AI learning resources.
          </p>

        </div>

      )}

      <div className="ai-suggestion-card">

        <div className="ai-suggestion-icon">
          <FaRobot />
        </div>

        <div>

          <span>
            SKILLORA AI INSIGHT
          </span>

          <h3>
            Keep building your future.
          </h3>

          <p>
            {aiSuggestion}
          </p>

        </div>

      </div>

    </section>
  );
}

export default RecommendedResources;