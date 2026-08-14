import { motion } from "framer-motion";
import {
  FiAward,
  FiDownload,
  FiEye,
  FiCalendar,
} from "react-icons/fi";

function Certificates({ certificates = [] }) {
  return (
    <section>

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Certificates
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Certificates earned after completing Skillora roadmaps.
          </p>

        </div>

        <span className="rounded-full bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300">
          {certificates.length} Earned
        </span>

      </div>

      {/* Empty */}

      {certificates.length === 0 ? (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 p-12 text-center"
        >

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-4xl shadow-xl">
            📜
          </div>

          <h3 className="mt-6 text-xl font-semibold text-white">
            No Certificates Yet
          </h3>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
            Complete a complete roadmap and pass the quizzes to
            unlock your Skillora certificates.
          </p>

        </motion.div>

      ) : (

        <div className="grid gap-6 lg:grid-cols-2">

          {certificates.map((certificate, index) => (

            <motion.div
              key={certificate.id}
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                y: -6,
              }}
              className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl"
            >

              {/* Ribbon */}

              <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

              <div className="p-6">

                <div className="flex items-start justify-between">

                  <div>

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl text-white shadow-lg">
                      <FiAward />
                    </div>

                  </div>

                  <div className="rounded-full bg-green-500/10 px-3 py-2 text-xs font-semibold text-green-400">
                    VERIFIED
                  </div>

                </div>

                <h3 className="mt-6 text-xl font-bold text-white">
                  {certificate.title}
                </h3>

                <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">

                  <FiCalendar />

                  Issued on {certificate.issued_at}

                </div>

                <div className="mt-8 flex gap-3">

                  <button
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500"
                  >

                    <FiEye />

                    View

                  </button>

                  <button
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-800 py-3 font-semibold text-slate-300 transition hover:border-indigo-500 hover:text-white"
                  >

                    <FiDownload />

                    Download

                  </button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      )}

    </section>
  );
}

export default Certificates;