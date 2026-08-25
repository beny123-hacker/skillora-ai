import React from "react";
import {
  FaRoad,
  FaRobot,
  FaBullseye,
  FaChartLine,
  FaStar,
} from "react-icons/fa";

function RoadmapHero({
  selectedCareer = "",
  roadmapData = null,
}) {
  const rawProgress =
    Number(
      roadmapData?.progress ?? 0
    );

  const progress =
    Math.min(
      Math.max(
        Number.isNaN(rawProgress)
          ? 0
          : rawProgress,
        0
      ),
      100
    );

  const milestones =
    roadmapData?.milestones?.length ??
    roadmapData?.steps?.length ??
    roadmapData?.roadmap?.milestones?.length ??
    0;

  return (
    <section className="roadmap-hero">

      <div className="roadmap-hero-glow glow-one" />
      <div className="roadmap-hero-glow glow-two" />

      <div className="roadmap-hero-content">

        <div className="roadmap-hero-left">

          <span className="roadmap-hero-badge">
            <FaStar />
            PERSONALIZED CAREER ROADMAP
          </span>

          <h1>
            Your path to becoming a
            <span>
              {" "}
              {selectedCareer || "future professional"}.
            </span>
          </h1>

          <p>
            Your AI-powered learning roadmap is designed
            around your selected career goal. Follow each
            milestone, build practical skills, and track
            your progress along the way.
          </p>

          <div className="roadmap-hero-mini-stats">

            <div>
              <FaBullseye />
              <span>
                {milestones} Milestones
              </span>
            </div>

            <div>
              <FaRobot />
              <span>
                AI Personalized
              </span>
            </div>

          </div>

        </div>

        <div className="roadmap-hero-right">

          <div className="career-roadmap-summary">

            <div className="summary-top">

              <div className="summary-icon">
                <FaRoad />
              </div>

              <div>

                <span>
                  YOUR SELECTED ROLE
                </span>

                <h3>
                  {selectedCareer ||
                    "Career Goal"}
                </h3>

              </div>

            </div>

            <div className="summary-progress-card">

              <div className="summary-progress-heading">

                <div>
                  <span>
                    JOURNEY PROGRESS
                  </span>

                  <strong>
                    {progress}% Complete
                  </strong>
                </div>

                <FaChartLine />

              </div>

              <div className="summary-progress-bar">

                <div
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>

            <div className="summary-bottom-stats">

              <div>
                <strong>
                  {milestones}
                </strong>

                <span>
                  Milestones
                </span>
              </div>

              <div>
                <strong>
                  AI
                </strong>

                <span>
                  Personalized
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default RoadmapHero;