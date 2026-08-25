import React, { useState } from "react";

function ChatInput({ onSendMessage, disabled = false }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || disabled) {
      return;
    }

    onSendMessage(trimmedMessage);
    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <div className="premium-chat-input-area">
      <form
        onSubmit={handleSubmit}
        className="premium-chat-form"
      >
        <div
          className={`premium-input-container ${
            disabled ? "is-disabled" : ""
          }`}
        >
          <div className="premium-input-icon">
            ✦
          </div>

          <textarea
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            onKeyDown={handleKeyDown}
            disabled={disabled}
            rows={1}
            placeholder={
              disabled
                ? "AI Coach is thinking..."
                : "Ask your AI Coach anything..."
            }
            className="premium-chat-textarea"
          />

          {message.length > 0 && (
            <span className="premium-character-count">
              {message.length}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={disabled || !message.trim()}
          className="premium-send-button"
          title={
            disabled
              ? "AI is thinking..."
              : "Send message"
          }
        >
          {disabled ? (
            <span className="premium-spinner" />
          ) : (
            <span>↑</span>
          )}
        </button>
      </form>

      <div className="premium-input-footer">
        <span>
          <kbd>Enter</kbd> to send
        </span>

        <span className="premium-input-divider">
          •
        </span>

        <span>
          <kbd>Shift + Enter</kbd> for a new line
        </span>

        <span className="premium-secure-note">
          🔒 Private learning session
        </span>
      </div>
    </div>
  );
}

export default ChatInput;