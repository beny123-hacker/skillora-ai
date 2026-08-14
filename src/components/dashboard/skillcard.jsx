import {
  FaArrowRight,
  FaClock,
  FaChartLine,
  FaPlayCircle,
  FaCode,
} from "react-icons/fa";

function SkillCard({
  skill = "React",
  progress = 80,
  level = "Advanced",
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-[#151c2f] to-[#111827] p-7 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/20">

      {/* Glow */}

      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-indigo-500/10 blur-[90px]" />

      {/* Top */}

      <div className="relative flex items-start justify-between">

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">

          <FaCode className="text-xl text-white" />

        </div>

        <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">

          {level}

        </span>

      </div>

      {/* Title */}

      <div className="relative mt-6">

        <h2 className="text-2xl font-bold text-white">

          {skill}

        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-400">

          Learn industry-level concepts with projects,
          AI guidance and interview preparation.

        </p>

      </div>

      {/* Progress */}

      <div className="mt-8">

        <div className="mb-3 flex items-center justify-between">

          <span className="text-sm text-slate-400">

            Progress

          </span>

          <span className="font-bold text-cyan-400">

            {progress}%

          </span>

        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-700">

          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* Bottom */}

      <div className="mt-8 flex items-center justify-between">

        <div>

          <div className="flex items-center gap-2 text-sm text-slate-400">

            <FaClock />

            <span>4 Hours</span>

          </div>

          <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">

            <FaChartLine />

            <span>Career Skill</span>

          </div>

        </div>

        <button
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-indigo-500
            to-purple-600
            px-4
            py-3
            text-sm
            font-semibold
            text-white
            transition-all
            duration-300
            hover:scale-105
          "
        >

          <FaPlayCircle />

          Start

          <FaArrowRight />

        </button>

      </div>

    </div>
  );
}

export default SkillCard;