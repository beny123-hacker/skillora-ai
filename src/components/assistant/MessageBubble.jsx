import React from "react";

function MessageBubble({
  message,
  isUser = false,
  timestamp,
}) {
  return (
    <div
      className={`premium-message-row ${
        isUser
          ? "premium-message-user"
          : "premium-message-ai"
      }`}
    >
      {!isUser && (
        <div className="premium-message-avatar ai">
          ✦
        </div>
      )}

      <div className="premium-message-content">
        {!isUser && (
          <div className="premium-message-meta">
            <span>Skillora AI</span>
            <span>•</span>
            <span>Coach</span>
          </div>
        )}

        <div
          className={`premium-message-bubble ${
            isUser
              ? "premium-user-bubble"
              : "premium-ai-bubble"
          }`}
        >
          <p>
            {message}
          </p>
        </div>

        {timestamp && (
          <span
            className={`premium-message-time ${
              isUser
                ? "user-time"
                : "ai-time"
            }`}
          >
            {timestamp}
          </span>
        )}
      </div>

      {isUser && (
        <div className="premium-message-avatar user">
          You
        </div>
      )}
    </div>
  );
}

export default MessageBubble;