import React from "react";
import {
  FaCheckCircle,
  FaLock,
  FaPlayCircle,
  FaClock,
} from "react-icons/fa";

function RoadmapTimeline({ roadmapData }) {
  // =========================================================
  // GET MILESTONES FROM AI ROADMAP
  // =========================================================

  const milestones =
    roadmapData?.milestones ||
    roadmapData?.roadmap ||
    roadmapData?.steps ||
    [];

  // Make sure we always work with an array
  const roadmapSteps = Array.isArray(milestones)
    ? milestones
    : [];

  // =========================================================
  // EMPTY STATE
  // =========================================================

  if (!roadmapSteps.length) {
    return (
      <section className="mt-14">

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-500/10 text-4xl">
            🗺️
          </div>

          <h2 className="mt-6 text-2xl font-bold text-white">
            No Roadmap Available
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Generate a roadmap to see your personalized learning
            timeline here.
          </p>

        </div>

      </section>
    );
  }

  // =========================================================
  // STATUS HELPER
  // =========================================================

  const getStatus = (step, index) => {
    if (step?.status) {
      return step.status.toLowerCase();
    }

    if (step?.completed === true) {
      return "completed";
    }

    if (index === 0) {
      return "current";
    }

    return "locked";
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <section className="mt-14">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="mb-10">

        <span className="inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs font-semibold tracking-wide text-indigo-300">
          AI GENERATED ROADMAP
        </span>

        <h2 className="mt-4 text-3xl font-bold text-white">
          🗺️ Learning Timeline
        </h2>

        <p className="mt-2 max-w-2xl text-slate-400">
          Follow your personalized learning roadmap step by step.
        </p>

      </div>

      {/* =====================================================
          TIMELINE
      ====================================================== */}

      <div className="relative ml-5 border-l-2 border-slate-700">

        {roadmapSteps.map((step, index) => {

          const status = getStatus(step, index);

          const title =
            step?.title ||
            step?.name ||
            step?.skill ||
            `Milestone ${index + 1}`;

          const description =
            step?.description ||
            step?.details ||
            step?.overview ||
            "Complete this milestone to continue your learning journey.";

          const duration =
            step?.duration ||
            step?.estimatedDuration ||
            step?.time ||
            "Not specified";

          return (
            <div
              key={step?.id || index}
              className="relative mb-10 ml-10 last:mb-0"
            >

              {/* =================================================
                  TIMELINE ICON
              ================================================= */}

              <div
                className={`absolute -left-[58px] flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg ${
                  status === "completed"
                    ? "bg-green-500 shadow-green-500/20"
                    : status === "current" ||
                      status === "in-progress"
                    ? "bg-indigo-600 shadow-indigo-500/20"
                    : "bg-slate-700"
                }`}
              >

                {status === "completed" && (
                  <FaCheckCircle />
                )}

                {(status === "current" ||
                  status === "in-progress") && (
                  <FaPlayCircle />
                )}

                {status !== "completed" &&
                  status !== "current" &&
                  status !== "in-progress" && (
                    <FaLock />
                  )}

              </div>

              {/* =================================================
                  CARD
              ================================================= */}

              <div
                className={`rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                  status === "completed"
                    ? "border-green-500/40 bg-green-500/10"
                    : status === "current" ||
                      status === "in-progress"
                    ? "border-indigo-500/40 bg-indigo-500/10 shadow-lg shadow-indigo-500/5"
                    : "border-slate-800 bg-slate-900"
                }`}
              >

                {/* Top Row */}

                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                  {/* Information */}

                  <div className="min-w-0">

                    <div className="flex items-center gap-3">

                      <span className="text-sm font-semibold text-slate-500">
                        STEP {index + 1}
                      </span>

                      {status === "current" ||
                      status === "in-progress" ? (
                        <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300">
                          Current
                        </span>
                      ) : null}

                    </div>

                    <h3 className="mt-3 text-2xl font-bold text-white">
                      {title}
                    </h3>

                    <p className="mt-3 max-w-3xl leading-7 text-slate-400">
                      {description}
                    </p>

                  </div>

                  {/* Status */}

                  <div className="shrink-0">

                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                        status === "completed"
                          ? "bg-green-500 text-white"
                          : status === "current" ||
                            status === "in-progress"
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >

                      {status === "completed"
                        ? "Completed"
                        : status === "current" ||
                          status === "in-progress"
                        ? "In Progress"
                        : "Locked"}

                    </span>

                  </div>

                </div>

                {/* =================================================
                    BOTTOM INFORMATION
                ================================================= */}

                <div className="mt-6 flex flex-wrap gap-3">

                  {/* Duration */}

                  <div className="inline-flex items-center gap-2 rounded-xl border border-white/5 bg-slate-950/60 px-4 py-3">

                    <FaClock className="text-indigo-400" />

                    <div>

                      <p className="text-xs text-slate-500">
                        Estimated Duration
                      </p>

                      <p className="mt-1 text-sm font-semibold text-white">
                        {duration}
                      </p>

                    </div>

                  </div>

                  {/* Skills */}

                  {Array.isArray(step?.skills) &&
                    step.skills.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/5 bg-slate-950/60 px-4 py-3">

                        <p className="mr-1 text-xs text-slate-500">
                          Skills:
                        </p>

                        {step.skills.map(
                          (skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300"
                            >
                              {skill}
                            </span>
                          )
                        )}

                      </div>
                    )}

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default RoadmapTimeline;