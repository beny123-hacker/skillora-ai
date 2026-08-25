import React from "react";
import {
  FaBullseye,
  FaCheckCircle,
  FaRoad,
  FaChartLine,
  FaStar,
} from "react-icons/fa";

function ProgressOverview({
  roadmapData = null,
}) {
  const milestones =
    roadmapData?.milestones ||
    roadmapData?.roadmap?.milestones ||
    roadmapData?.steps ||
    roadmapData?.roadmap ||
    [];

  const roadmapSteps =
    Array.isArray(milestones)
      ? milestones
      : [];

  const totalTopics =
    roadmapSteps.length;

  const completedTopics =
    roadmapSteps.filter(
      (step) =>
        step?.completed === true ||
        String(step?.status || "")
          .toLowerCase() === "completed"
    ).length;

  const aiProgress =
    Number(roadmapData?.progress);

  const calculatedProgress =
    totalTopics > 0
      ? Math.round(
          (completedTopics / totalTopics) * 100
        )
      : 0;

  const progress =
    !Number.isNaN(aiProgress)
      ? Math.min(
          Math.max(aiProgress, 0),
          100
        )
      : calculatedProgress;

  return (
    <section className="progress-overview-section">

      <div className="progress-overview-header">

        <div>

          <span className="roadmap-label">
            <FaStar />
            JOURNEY OVERVIEW
          </span>

          <h2>
            Your learning journey
            <span> at a glance.</span>
          </h2>

        </div>

      </div>

      <div className="progress-overview-grid">

        <div className="overview-progress-card">

          <div className="overview-progress-top">

            <div className="overview-icon purple">
              <FaChartLine />
            </div>

            <div>
              <span>
                OVERALL PROGRESS
              </span>

              <h3>
                {progress}%
              </h3>
            </div>

          </div>

          <div className="overview-progress-bar">

            <div
              className="overview-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <p>
            Keep learning consistently to unlock
            your next milestones.
          </p>

        </div>

        <div className="overview-stat-card">

          <div className="overview-icon blue">
            <FaRoad />
          </div>

          <div>
            <span>
              TOTAL MILESTONES
            </span>

            <h3>
              {totalTopics}
            </h3>
          </div>

        </div>

        <div className="overview-stat-card">

          <div className="overview-icon green">
            <FaCheckCircle />
          </div>

          <div>
            <span>
              COMPLETED
            </span>

            <h3>
              {completedTopics}
            </h3>
          </div>

        </div>

        <div className="overview-stat-card">

          <div className="overview-icon gold">
            <FaBullseye />
          </div>

          <div>
            <span>
              NEXT GOAL
            </span>

            <h3>
              {totalTopics - completedTopics > 0
                ? totalTopics - completedTopics
                : 0}
            </h3>
          </div>

        </div>

      </div>

    </section>
  );
}

export default ProgressOverview;