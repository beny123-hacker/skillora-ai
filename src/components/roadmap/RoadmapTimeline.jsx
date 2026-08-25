import React from "react";
import {
  FaCheckCircle,
  FaLock,
  FaPlayCircle,
  FaStar,
} from "react-icons/fa";

import MilestoneCard from "./MilestoneCard";

function RoadmapTimeline({
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

  if (!roadmapSteps.length) {
    return (
      <section className="roadmap-timeline-section">
        <div className="roadmap-empty-state">
          <div className="empty-state-icon">
            🗺️
          </div>

          <h3>No Roadmap Available</h3>

          <p>
            Select a career role and generate your
            personalized learning roadmap.
          </p>
        </div>
      </section>
    );
  }

  const getStatus = (step, index) => {
    if (step?.status) {
      return String(
        step.status
      ).toLowerCase();
    }

    if (step?.completed === true) {
      return "completed";
    }

    const hasCurrentStep =
      roadmapSteps.some(
        (item) =>
          String(
            item?.status || ""
          ).toLowerCase() === "current" ||
          String(
            item?.status || ""
          ).toLowerCase() === "in-progress"
      );

    if (index === 0 && !hasCurrentStep) {
      return "current";
    }

    return "locked";
  };

  return (
    <section className="roadmap-timeline-section">
      <div className="roadmap-section-heading">
        <span className="roadmap-label">
          <FaStar />
          YOUR LEARNING JOURNEY
        </span>

        <h2>
          Follow your roadmap
          <span> step by step.</span>
        </h2>

        <p>
          Complete each milestone and continue
          progressing toward your career goal.
        </p>
      </div>

      <div className="roadmap-timeline">
        {roadmapSteps.map(
          (step, index) => {
            const status =
              getStatus(step, index);

            const isCompleted =
              status === "completed";

            const isCurrent =
              status === "current" ||
              status === "in-progress";

            return (
              <div
                className="timeline-item"
                key={
                  step?.id ||
                  `${index}-${step?.title || "milestone"}`
                }
              >
                <div className="timeline-indicator">
                  {index <
                    roadmapSteps.length - 1 && (
                    <div className="timeline-line" />
                  )}

                  <div
                    className={`timeline-node ${
                      isCompleted
                        ? "timeline-node-completed"
                        : isCurrent
                        ? "timeline-node-current"
                        : "timeline-node-locked"
                    }`}
                  >
                    {isCompleted && (
                      <FaCheckCircle />
                    )}

                    {isCurrent && (
                      <FaPlayCircle />
                    )}

                    {!isCompleted &&
                      !isCurrent && (
                        <FaLock />
                      )}
                  </div>
                </div>

                <MilestoneCard
                  step={step}
                  index={index}
                  status={status}
                />
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}

export default RoadmapTimeline;