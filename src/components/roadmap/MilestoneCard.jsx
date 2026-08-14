import {
  FaBookOpen,
  FaClock,
  FaStar,
  FaPlay,
  FaYoutube,
  FaCheckCircle,
} from "react-icons/fa";

function MilestoneCard({
  title = "React Fundamentals",
  description = "Learn components, props, state, hooks and routing.",
  duration = "5 Hours",
  progress = 65,
  xp = 250,
  completed = false,
}) {
  return (
    <div
      className={`rounded-3xl border overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
        completed
          ? "border-green-500 bg-green-500/10"
          : "border-slate-800 bg-slate-900 hover:border-indigo-500"
      }`}
    >
      {/* Top Bar */}

      <div
        className={`h-2 ${
          completed
            ? "bg-green-500"
            : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        }`}
      />

      <div className="p-7">

        {/* Badge */}

        <div className="flex justify-between items-center">

          <span className="px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-300 text-sm">

            📍 Milestone

          </span>

          {completed && (
            <span className="text-green-400 flex items-center gap-2">

              <FaCheckCircle />

              Completed

            </span>
          )}

        </div>

        {/* Title */}

        <h2 className="mt-6 text-2xl font-bold text-white">
          {title}
        </h2>

        <p className="mt-4 text-slate-400 leading-7">
          {description}
        </p>

        {/* Progress */}

        <div className="mt-7">

          <div className="flex justify-between mb-2">

            <span className="text-slate-400">
              Progress
            </span>

            <span className="text-indigo-400 font-semibold">
              {progress}%
            </span>

          </div>

          <div className="h-3 rounded-full bg-slate-800 overflow-hidden">

            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
              style={{ width: `${progress}%` }}
            />

          </div>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 gap-4 mt-8">

          <div className="bg-slate-800 rounded-2xl p-4">

            <div className="flex items-center gap-2 text-slate-300">

              <FaClock />

              Duration

            </div>

            <p className="mt-2 text-white font-semibold">
              {duration}
            </p>

          </div>

          <div className="bg-slate-800 rounded-2xl p-4">

            <div className="flex items-center gap-2 text-slate-300">

              <FaStar className="text-yellow-400" />

              XP Reward

            </div>

            <p className="mt-2 text-white font-semibold">
              {xp} XP
            </p>

          </div>

        </div>

        {/* Buttons */}

        <div className="flex gap-3 mt-8">

          <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 rounded-2xl py-3 text-white flex justify-center items-center gap-3 transition">

            <FaPlay />

            Start Learning

          </button>

          <button className="w-14 rounded-2xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition">

            <FaYoutube />

          </button>

          <button className="w-14 rounded-2xl bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center transition">

            <FaBookOpen />

          </button>

        </div>

      </div>
    </div>
  );
}

export default MilestoneCard;