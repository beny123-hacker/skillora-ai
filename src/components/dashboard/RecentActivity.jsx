import React from "react";
import {
  FaHistory,
  FaBookOpen,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

function RecentActivity({ activities = [] }) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10">
          <FaHistory className="text-xl text-indigo-400" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-400">
            Activity
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            Recent Activity
          </h2>
        </div>
      </div>

      {/* ACTIVITIES */}
      {activities.length > 0 ? (
        <div className="mt-8 space-y-4">
          {activities.map((activity, index) => (
            <div
              key={activity.id || index}
              className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">
                {activity.type === "completed" ? (
                  <FaCheckCircle className="text-green-400" />
                ) : activity.type === "course" ? (
                  <FaBookOpen className="text-indigo-400" />
                ) : (
                  <FaClock className="text-cyan-400" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white">
                  {activity.title}
                </p>

                {activity.description && (
                  <p className="mt-1 text-sm text-slate-500">
                    {activity.description}
                  </p>
                )}
              </div>

              {activity.time && (
                <span className="shrink-0 text-xs text-slate-500">
                  {activity.time}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* EMPTY STATE */
        <div className="mt-8 rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800">
            <FaHistory className="text-xl text-slate-500" />
          </div>

          <h3 className="mt-5 font-semibold text-white">
            No recent activity
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Your learning activities will appear here once you start
            completing lessons, courses or other learning tasks.
          </p>
        </div>
      )}
    </section>
  );
}

export default RecentActivity;