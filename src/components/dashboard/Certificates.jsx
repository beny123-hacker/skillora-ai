import React from "react";

import {
  FaCertificate,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Certificates({
  certificates = [],
}) {
  const hasCertificates = certificates.length > 0;

  return (
    <section className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#090d1a] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:p-8">

      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/10">

            <FaCertificate className="text-lg text-amber-400" />

          </div>

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400">
              Achievements
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Certificates
            </h2>

          </div>

        </div>

        {hasCertificates && (
          <span className="rounded-full border border-amber-400/10 bg-amber-400/[0.05] px-3 py-1 text-xs font-bold text-amber-400">
            {certificates.length} Earned
          </span>
        )}

      </div>

      {/* CERTIFICATES */}

      {hasCertificates ? (

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {certificates.map((certificate, index) => (

            <div
              key={certificate.id || index}
              className="group min-w-0 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition duration-300 hover:-translate-y-1 hover:border-amber-400/20 hover:bg-white/[0.04]"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10">

                <FaCertificate className="text-xl text-amber-400" />

              </div>

              <h3 className="mt-5 break-words text-base font-bold text-white">
                {certificate.title}
              </h3>

              {certificate.issuedAt && (
                <p className="mt-2 text-xs text-slate-600">
                  Issued {certificate.issuedAt}
                </p>
              )}

              {certificate.description && (
                <p className="mt-3 break-words text-sm leading-6 text-slate-500">
                  {certificate.description}
                </p>
              )}

            </div>

          ))}

        </div>

      ) : (

        <div className="mt-7 rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.015] px-6 py-10 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04]">

            <FaLock className="text-xl text-slate-600" />

          </div>

          <h3 className="mt-5 text-xl font-black text-white">
            No certificates yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Complete courses and learning milestones to earn
            certificates that you can showcase on your profile.
          </p>

          <Link
            to="/learn"
            className="mt-6 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5"
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