import React from "react";
import { useNavigate } from "react-router-dom";
import ChatWindow from "../components/assistant/ChatWindow";
import "../styles/assistant.css";

function Assistant() {
  const navigate = useNavigate();

  return (
    <div className="ai-coach-page">
      <div className="ai-coach-glow ai-coach-glow-one" />
      <div className="ai-coach-glow ai-coach-glow-two" />

      <main className="ai-coach-shell">
        {/* TOP NAVIGATION */}
        <header className="ai-coach-topbar">
          <div className="ai-coach-brand-group">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="ai-coach-back"
              title="Go back"
            >
              <span>←</span>
            </button>

            <div className="ai-coach-brand-icon">
              <div className="ai-coach-brand-icon-inner">
                ✦
              </div>
            </div>

            <div className="ai-coach-brand-text">
              <div className="ai-coach-eyebrow">
                SKILLORA AI
              </div>

              <h1>AI Coach</h1>

              <p>
                Your intelligent learning companion
              </p>
            </div>
          </div>

          <div className="ai-coach-status">
            <span className="ai-coach-status-dot" />
            <span>AI Online</span>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <section className="ai-coach-content">
          <div className="ai-coach-intro">
            <div>
              <span className="ai-coach-section-label">
                PERSONALIZED LEARNING
              </span>

              <h2>
                Learn smarter.
                <span> Ask anything.</span>
              </h2>

              <p>
                Get instant explanations, coding help, study guidance,
                career direction, and personalized learning support.
              </p>
            </div>

            <div className="ai-coach-intro-badge">
              <span className="ai-coach-spark">✦</span>
              <div>
                <strong>Powered by AI</strong>
                <small>Built for your learning journey</small>
              </div>
            </div>
          </div>

          <div className="ai-coach-chat-wrapper">
            <ChatWindow />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Assistant;