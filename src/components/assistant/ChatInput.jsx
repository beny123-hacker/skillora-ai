import React, { useState } from "react";

function ChatInput({ onSendMessage, disabled = false }) {
  const [message, setMessage] = useState("");

  // =========================================================
  // SEND MESSAGE
  // =========================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || disabled) {
      return;
    }

    onSendMessage(trimmedMessage);
    setMessage("");
  };

  // =========================================================
  // KEYBOARD HANDLING
  // =========================================================

  const handleKeyDown = (e) => {
    // Enter = Send
    // Shift + Enter = New Line

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="w-full shrink-0 border-t border-white/10 bg-slate-900/95 p-3 backdrop-blur-md sm:p-4">

      <form
        onSubmit={handleSubmit}
        className="flex w-full items-end gap-3"
      >

        {/* ===================================================
            MESSAGE INPUT
        =================================================== */}

        <div className="relative min-w-0 flex-1">

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            rows={1}
            placeholder={
              disabled
                ? "Skillora AI is thinking..."
                : "Ask Skillora AI anything..."
            }
            className="
              min-h-[54px]
              max-h-32
              w-full
              resize-none
              rounded-2xl
              border
              border-white/10
              bg-slate-800
              px-5
              py-4
              pr-14
              text-sm
              leading-5
              text-white
              outline-none
              transition-all
              duration-200
              placeholder:text-slate-500
              focus:border-blue-500/50
              focus:bg-slate-800/90
              focus:ring-2
              focus:ring-blue-500/10
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />

          {/* =================================================
              CHARACTER COUNT
          ================================================= */}

          {message.length > 0 && (
            <span className="pointer-events-none absolute bottom-2 right-4 text-[10px] text-slate-500">
              {message.length}
            </span>
          )}

        </div>

        {/* ===================================================
            SEND BUTTON
        =================================================== */}

        <button
          type="submit"
          disabled={disabled || !message.trim()}
          title={
            disabled
              ? "AI is thinking..."
              : "Send message"
          }
          className="
            flex
            h-[54px]
            w-[54px]
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            to-purple-600
            text-xl
            text-white
            shadow-lg
            shadow-blue-500/10
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:scale-105
            hover:shadow-blue-500/20
            active:scale-95
            disabled:cursor-not-allowed
            disabled:opacity-40
            disabled:hover:translate-y-0
            disabled:hover:scale-100
          "
        >
          {disabled ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            "➤"
          )}
        </button>

      </form>

      {/* =====================================================
          KEYBOARD HINT
      ===================================================== */}

      <p className="mt-2 text-center text-[11px] text-slate-600">
        Press{" "}
        <span className="text-slate-500">
          Enter
        </span>{" "}
        to send
        {" • "}
        <span className="text-slate-500">
          Shift + Enter
        </span>{" "}
        for a new line
      </p>

    </div>
  );
}

export default ChatInput;