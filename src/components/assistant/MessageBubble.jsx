import React from "react";

function MessageBubble({
  message,
  isUser = false,
  timestamp,
}) {
  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* =====================================================
          USER MESSAGE
      ===================================================== */}

      {isUser ? (
        <div className="flex max-w-[75%] items-end gap-3">

          {/* User Message */}

          <div className="flex flex-col items-end">

            <div className="rounded-2xl rounded-br-md bg-blue-600 px-4 py-3 text-white shadow-md">

              <p className="whitespace-pre-wrap break-words text-sm leading-6">
                {message}
              </p>

            </div>

            {timestamp && (
              <p className="mt-1 px-1 text-[10px] text-slate-600">
                {timestamp}
              </p>
            )}

          </div>

          {/* User Avatar */}

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm text-white shadow-md">
            👤
          </div>

        </div>
      ) : (

        /* ===================================================
           AI MESSAGE
        =================================================== */

        <div className="flex max-w-[75%] items-end gap-3">

          {/* AI Avatar */}

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-sm text-white shadow-md">
            🤖
          </div>

          {/* AI Message */}

          <div className="flex flex-col items-start">

            <div className="rounded-2xl rounded-bl-md border border-white/10 bg-slate-800 px-4 py-3 text-slate-100 shadow-md">

              <p className="whitespace-pre-wrap break-words text-sm leading-6">
                {message}
              </p>

            </div>

            {timestamp && (
              <p className="mt-1 px-1 text-[10px] text-slate-600">
                {timestamp}
              </p>
            )}

          </div>

        </div>
      )}
    </div>
  );
}

export default MessageBubble;