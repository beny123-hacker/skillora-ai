import React from "react";
import {
  FaFire,
  FaBookOpen,
  FaTrophy,
  FaBullseye,
} from "react-icons/fa";

function ProgressOverview({
  roadmapData = null,
}) {
  // =========================================================
  // GET MILESTONES
  // =========================================================

  const milestones =
    roadmapData?.milestones ||
    roadmapData?.roadmap?.milestones ||
    roadmapData?.steps ||
    roadmapData?.roadmap ||
    [];

  const roadmapSteps = Array.isArray(milestones)
    ? milestones
    : [];

  // =========================================================
  // COMPLETED MILESTONES
  // =========================================================

  const completedMilestones = roadmapSteps.filter(
    (step) =>
      step?.completed === true ||
      String(step?.status || "").toLowerCase() === "completed"
  );

  const completedCount = completedMilestones.length;

  const totalCount = roadmapSteps.length;

  // =========================================================
  // PROGRESS
  // =========================================================

  let roadmapProgress = 0;

  if (totalCount > 0) {
    roadmapProgress = Math.round(
      (completedCount / totalCount) * 100
    );
  }

  // If n8n explicitly provides progress, use it.
  if (
    roadmapData?.progress !== undefined &&
    roadmapData?.progress !== null
  ) {
    const parsedProgress = Number(
      roadmapData.progress
    );

    if (!Number.isNaN(parsedProgress)) {
      roadmapProgress = Math.min(
        Math.max(parsedProgress, 0),
        100
      );
    }
  }

  // =========================================================
  // CURRENT STAGE
  // =========================================================

  const currentMilestone =
    roadmapSteps.find((step) => {
      const status = String(
        step?.status || ""
      ).toLowerCase();

      return (
        status === "current" ||
        status === "in-progress" ||
        status === "in progress"
      );
    }) ||
    roadmapSteps.find(
      (step) => step?.completed !== true
    );

  const currentStage =
    currentMilestone?.title ||
    currentMilestone?.name ||
    currentMilestone?.skill ||
    "Not started";

  // =========================================================
  // NEXT SKILL
  // =========================================================

  let currentIndex = -1;

  if (currentMilestone) {
    currentIndex = roadmapSteps.indexOf(
      currentMilestone
    );
  }

  const nextMilestone =
    currentIndex >= 0
      ? roadmapSteps[currentIndex + 1]
      : roadmapSteps.find(
          (step) => step?.completed !== true
        );

  const nextSkill =
    nextMilestone?.title ||
    nextMilestone?.name ||
    nextMilestone?.skill ||
    "Complete current stage";

  // =========================================================
  // OTHER AI DATA
  // =========================================================

  const learningStreak =
    roadmapData?.learningStreak ??
    roadmapData?.streak ??
    roadmapData?.learning_streak ??
    0;

  const learningHours =
    roadmapData?.learningHours ??
    roadmapData?.learning_hours ??
    roadmapData?.hoursLearned ??
    roadmapData?.hours ??
    0;

  const xpEarned =
    roadmapData?.xpEarned ??
    roadmapData?.xp_earned ??
    roadmapData?.xp ??
    0;

  const estimatedFinish =
    roadmapData?.estimatedFinish ??
    roadmapData?.estimated_finish ??
    roadmapData?.completionTime ??
    roadmapData?.duration ??
    "Not specified";

  // =========================================================
  // STAT CARDS
  // =========================================================

  const stats = [
    {
      title: "Roadmap Progress",
      value: `${roadmapProgress}%`,
      icon: <FaBullseye />,
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Learning Streak",
      value: `${learningStreak} Days`,
      icon: <FaFire />,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Learning Hours",
      value: `${learningHours} Hrs`,
      icon: <FaBookOpen />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "XP Earned",
      value: `${xpEarned} XP`,
      icon: <FaTrophy />,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <section className="mt-14">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="mb-8">

        <span className="inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs font-semibold tracking-wide text-indigo-300">
          YOUR LEARNING ANALYTICS
        </span>

        <h2 className="mt-4 text-3xl font-bold text-white">
          📊 Progress Overview
        </h2>

        <p className="mt-2 text-slate-400">
          Monitor your achievements and learning performance.
        </p>

      </div>

      {/* =====================================================
          STAT CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => (

          <div
            key={item.title}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500"
          >

            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} text-3xl text-white shadow-lg`}
            >
              {item.icon}
            </div>

            <h3 className="mt-6 text-4xl font-bold text-white">
              {item.value}
            </h3>

            <p className="mt-3 text-slate-400">
              {item.title}
            </p>

          </div>

        ))}

      </div>

      {/* =====================================================
          OVERALL PROGRESS
      ====================================================== */}

      <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">

        {/* Header */}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h3 className="text-2xl font-bold text-white">
              Overall Career Progress
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {completedCount} of {totalCount} milestones completed
            </p>

          </div>

          <span className="text-2xl font-bold text-indigo-400">
            {roadmapProgress}%
          </span>

        </div>

        {/* Progress Bar */}

        <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-800">

          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700"
            style={{
              width: `${roadmapProgress}%`,
            }}
          />

        </div>

        {/* =================================================
            CURRENT / NEXT / FINISH
        ================================================== */}

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* Current Stage */}

          <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-5">

            <p className="text-sm text-slate-500">
              Current Stage
            </p>

            <h4 className="mt-2 text-lg font-bold text-white">
              {currentStage}
            </h4>

          </div>

          {/* Next Skill */}

          <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-5">

            <p className="text-sm text-slate-500">
              Next Skill
            </p>

            <h4 className="mt-2 text-lg font-bold text-white">
              {nextSkill}
            </h4>

          </div>

          {/* Estimated Finish */}

          <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-5">

            <p className="text-sm text-slate-500">
              Estimated Finish
            </p>

            <h4 className="mt-2 text-lg font-bold text-white">
              {estimatedFinish}
            </h4>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ProgressOverview;