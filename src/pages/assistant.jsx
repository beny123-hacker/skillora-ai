import React from "react";
import { useNavigate } from "react-router-dom";

import ChatWindow from "../components/assistant/ChatWindow";

function Assistant() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">

      <main className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-4 py-5 sm:px-6 lg:px-8">

        {/* =====================================================
            TOP BAR
        ===================================================== */}

        <div className="mb-5 flex items-center justify-between gap-4">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            {/* Back Button */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg text-slate-300 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
              title="Go back"
            >
              ←
            </button>

            {/* AI Icon */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-xl shadow-lg shadow-blue-500/10">
              🤖
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                AI Assistant
              </h1>

              <p className="text-xs text-slate-400 sm:text-sm">
                Your personal AI-powered learning companion
              </p>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="hidden items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-3 py-1.5 sm:flex">

            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

            <span className="text-xs font-medium text-green-300">
              AI Online
            </span>

          </div>

        </div>


        {/* =====================================================
            CHAT WINDOW
        ===================================================== */}

        <div className="min-h-0 flex-1">

          <ChatWindow />

        </div>

      </main>

    </div>
  );
}

export default Assistant;