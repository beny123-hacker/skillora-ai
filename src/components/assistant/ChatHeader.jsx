import React from "react";

function ChatHeader({ onClearChat }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-slate-900 px-4 py-4 sm:px-6">

      {/* AI Assistant Info */}
      <div className="flex items-center gap-3">

        {/* AI Avatar */}
        <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-xl shadow-lg">
          🤖

          {/* Online Indicator */}
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-900 bg-green-400" />
        </div>

        {/* Name and Status */}
        <div>
          <h2 className="text-base font-bold text-white sm:text-lg">
            Skillora AI Assistant
          </h2>

          <div className="mt-0.5 flex items-center gap-2">
            <span className="text-xs text-green-400">
              Online
            </span>

            <span className="text-xs text-slate-500">
              •
            </span>

            <span className="text-xs text-slate-500">
              Ready to help you
            </span>
          </div>
        </div>

      </div>

      {/* Clear Chat Button */}
      <button
        type="button"
        onClick={onClearChat}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-300 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
        title="Clear conversation"
      >
        <span>🗑️</span>

        <span className="hidden sm:inline">
          Clear Chat
        </span>
      </button>

    </div>
  );
}

export default ChatHeader;