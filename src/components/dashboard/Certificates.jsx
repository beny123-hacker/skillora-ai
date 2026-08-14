import React from "react";
import {
  FaCertificate,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Certificates({ certificates = [] }) {
  const hasCertificates = certificates.length > 0;

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-8 lg:p-10">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10">
            <FaCertificate className="text-xl text-yellow-400" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-400">
              Achievements
            </p>

            <h2 className="mt-1 text-2xl font-bold text-white">
              Certificates
            </h2>
          </div>
        </div>

        {hasCertificates && (
          <span className="text-sm font-semibold text-slate-400">
            {certificates.length} earned
          </span>
        )}
      </div>

      {hasCertificates ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate, index) => (
            <div
              key={certificate.id || index}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-yellow-500/30"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10">
                <FaCertificate className="text-2xl text-yellow-400" />
              </div>

              <h3 className="mt-5 font-bold text-white">
                {certificate.title}
              </h3>

              {certificate.issuedAt && (
                <p className="mt-2 text-xs text-slate-500">
                  Issued {certificate.issuedAt}
                </p>
              )}

              {certificate.description && (
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {certificate.description}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* EMPTY STATE */
        <div className="mt-8 rounded-3xl border border-dashed border-slate-700 bg-slate-900/40 p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800">
            <FaLock className="text-2xl text-slate-500" />
          </div>

          <h3 className="mt-5 text-xl font-bold text-white">
            No certificates yet
          </h3>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
            Complete your courses and learning milestones to earn
            certificates that you can showcase on your profile.
          </p>

          <Link
            to="/learn"
            className="mt-6 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 font-semibold text-white transition hover:scale-105"
          >
            Start Learning

            <FaArrowRight />
          </Link>
        </div>
      )}
    </section>
  );
}

export default Certificates;