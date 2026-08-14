import {
  FaBookOpen,
  FaClock,
  FaPlay,
} from "react-icons/fa";

function CourseCard({ course, onSelect }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10">

      {/* Top Gradient */}

      <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <div className="p-6">

        {/* Icon */}

        <div className="flex items-start justify-between">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-3xl">
            {course.icon}
          </div>

          <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
            {course.category}
          </span>

        </div>

        {/* Title */}

        <h3 className="mt-6 text-xl font-bold text-white group-hover:text-indigo-300">
          {course.title}
        </h3>

        {/* Description */}

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
          {course.description}
        </p>

        {/* Details */}

        <div className="mt-5 flex flex-wrap gap-3">

          <span className="rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-400">
            📊 {course.level}
          </span>

          <span className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-400">
            <FaClock />
            {course.duration}
          </span>

        </div>

        {/* Button */}

        <button
          type="button"
          onClick={() => onSelect?.(course)}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          <FaBookOpen />
          View Course
          <FaPlay className="text-sm" />
        </button>

      </div>

    </div>
  );
}

export default CourseCard;