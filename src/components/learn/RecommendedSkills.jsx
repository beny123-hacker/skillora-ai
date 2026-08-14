import React from "react";
import {
  FaRobot,
  FaArrowRight,
  FaClock,
  FaChartLine,
  FaPlayCircle,
} from "react-icons/fa";

function RecommendedSkills({
  onLearn,
  courses = [],
}) {
  const recommendedCourses = courses.slice(0, 4);

  return (
    <section className="mt-12">

      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <div className="flex items-center gap-3">

            <FaRobot className="text-3xl text-purple-400" />

            <h2 className="text-3xl font-bold text-white">
              AI Recommended Skills
            </h2>

          </div>

          <p className="mt-2 text-slate-400">
            Recommended courses based on your learning interests.
          </p>

        </div>

      </div>

      {/* =========================
          COURSES
      ========================= */}

      {recommendedCourses.length > 0 ? (

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

          {recommendedCourses.map((course) => (

            <div
              key={course.id}
              className="group rounded-3xl border border-slate-800 bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500"
            >

              {/* Badge */}

              <div className="flex items-center justify-between">

                <span className="rounded-full bg-purple-600/20 px-4 py-2 text-sm text-purple-300">
                  🤖 AI Recommended
                </span>

                <span className="font-semibold text-green-400">
                  {course.level}
                </span>

              </div>

              {/* Title */}

              <h3 className="mt-6 text-3xl font-bold text-white transition group-hover:text-indigo-400">
                {course.title}
              </h3>

              {/* Description */}

              <p className="mt-3 leading-7 text-slate-400">
                {course.description}
              </p>

              {/* Course Information */}

              <div className="mt-7 flex flex-wrap gap-4">

                <div className="flex items-center gap-2 text-slate-400">
                  <FaClock />
                  <span>{course.duration || "Self-paced"}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  <FaChartLine />
                  <span>
                    {course.videos?.length || 0} YouTube Lessons
                  </span>
                </div>

              </div>

              {/* Button */}

              <div className="mt-8 flex justify-end">

                <button
                  type="button"
                  onClick={() => onLearn?.(course)}
                  className="flex items-center gap-3 rounded-2xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
                >

                  <FaPlayCircle />

                  Start Learning

                  <FaArrowRight />

                </button>

              </div>

            </div>

          ))}

        </div>

      ) : (

        /* =========================
           EMPTY STATE
        ========================= */

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">

          <FaRobot className="mx-auto text-4xl text-purple-400" />

          <h3 className="mt-4 text-xl font-bold text-white">
            No recommended courses yet
          </h3>

          <p className="mt-2 text-slate-400">
            Search for a course above to start learning.
          </p>

        </div>

      )}

    </section>
  );
}

export default RecommendedSkills;