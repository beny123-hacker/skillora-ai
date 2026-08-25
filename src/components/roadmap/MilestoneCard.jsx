import React from "react";

import {
  FaCheckCircle,
  FaLock,
  FaPlayCircle,
  FaClock,
  FaCode,
} from "react-icons/fa";

function MilestoneCard({
  step = {},
  index,
  status,
}) {
  const title =
    step?.title ||
    step?.name ||
    step?.skill ||
    `Milestone ${index + 1}`;

  const description =
    step?.description ||
    step?.details ||
    step?.overview ||
    "Complete this milestone to continue progressing through your learning roadmap.";

  const duration =
    step?.duration ||
    step?.estimatedDuration ||
    step?.time ||
    "Flexible";

  const skills =
    Array.isArray(step?.skills)
      ? step.skills
      : Array.isArray(step?.topics)
      ? step.topics
      : [];

  const normalizedStatus =
    String(
      status || ""
    ).toLowerCase();

  const isCompleted =
    normalizedStatus ===
    "completed";

  const isCurrent =
    normalizedStatus ===
    "current";

  return (
    <article
      className={`milestone-card ${
        isCompleted
          ? "milestone-completed"
          : isCurrent
          ? "milestone-current"
          : "milestone-locked"
      }`}
    >

      <div className="milestone-card-top">

        <span className="milestone-number">
          STEP {index + 1}
        </span>

        <span
          className={`milestone-status ${
            isCompleted
              ? "status-completed"
              : isCurrent
              ? "status-current"
              : "status-locked"
          }`}
        >

          {isCompleted && (
            <>
              <FaCheckCircle />
              Completed
            </>
          )}

          {isCurrent && (
            <>
              <FaPlayCircle />
              In Progress
            </>
          )}

          {!isCompleted &&
            !isCurrent && (
              <>
                <FaLock />
                Locked
              </>
            )}

        </span>

      </div>

      <h3>
        {title}
      </h3>

      <p className="milestone-description">
        {description}
      </p>

      <div className="milestone-footer">

        <div className="milestone-duration">

          <FaClock />

          <div>

            <span>
              Estimated duration
            </span>

            <strong>
              {duration}
            </strong>

          </div>

        </div>

        {skills.length > 0 && (

          <div className="milestone-skills">

            <FaCode />

            <div className="skills-list">

              {skills.map(
                (
                  skill,
                  skillIndex
                ) => (

                  <span
                    key={`${skill}-${skillIndex}`}
                  >
                    {skill}
                  </span>

                )
              )}

            </div>

          </div>

        )}

      </div>

    </article>
  );
}

export default MilestoneCard;