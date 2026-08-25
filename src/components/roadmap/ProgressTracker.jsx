import React from "react";
import {
  FaChartLine,
  FaCheckCircle,
  FaRoad,
  FaStar,
} from "react-icons/fa";

function ProgressTracker({
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

  const calculatedProgress =
    totalTopics > 0
      ? Math.round(
          (completedTopics / totalTopics) * 100
        )
      : 0;

  const aiProgress =
    Number(roadmapData?.progress);

  const progress =
    !Number.isNaN(aiProgress)
      ? Math.min(
          Math.max(aiProgress, 0),
          100
        )
      : calculatedProgress;

  const remainingTopics =
    Math.max(
      totalTopics - completedTopics,
      0
    );

  return (
    <section className="progress-tracker-section">

      <div className="progress-tracker-card">

        <div className="progress-tracker-header">

          <div>

            <span className="roadmap-label">
              <FaStar />
              LEARNING PROGRESS
            </span>

            <h2>
              Keep moving
              <span> forward.</span>
            </h2>

            <p>
              Every completed milestone brings you
              closer to your career goal.
            </p>

          </div>

          <div className="tracker-percentage">

            <div className="tracker-percentage-icon">
              <FaChartLine />
            </div>

            <div>
              <strong>
                {progress}%
              </strong>

              <span>
                Completed
              </span>
            </div>

          </div>

        </div>

        <div className="tracker-progress-area">

          <div className="tracker-progress-info">

            <span>
              Journey Progress
            </span>

            <span>
              {completedTopics} of {totalTopics}
            </span>

          </div>

          <div className="tracker-progress-bar">

            <div
              className="tracker-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        <div className="tracker-stats-grid">

          <div className="tracker-stat">

            <div className="tracker-stat-icon green">
              <FaCheckCircle />
            </div>

            <div>
              <span>
                Completed
              </span>

              <strong>
                {completedTopics}
              </strong>

              <small>
                Milestones finished
              </small>
            </div>

          </div>

          <div className="tracker-stat">

            <div className="tracker-stat-icon purple">
              <FaRoad />
            </div>

            <div>
              <span>
                Remaining
              </span>

              <strong>
                {remainingTopics}
              </strong>

              <small>
                Milestones ahead
              </small>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ProgressTracker;