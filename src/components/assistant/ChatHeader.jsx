import React from "react";

function ChatHeader({ onClearChat }) {
  return (
    <header className="premium-chat-header">
      <div className="premium-chat-identity">
        <div className="premium-ai-avatar">
          <span>✦</span>
          <span className="premium-online-dot" />
        </div>

        <div className="premium-chat-title">
          <div className="premium-chat-name-row">
            <h2>Skillora AI Coach</h2>

            <span className="premium-live-badge">
              <span />
              LIVE
            </span>
          </div>

          <p>
            Your personal learning intelligence
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClearChat}
        className="premium-clear-button"
        title="Clear conversation"
      >
        <span className="premium-clear-icon">⌫</span>
        <span className="premium-clear-text">
          Clear
        </span>
      </button>
    </header>
  );
}

export default ChatHeader;