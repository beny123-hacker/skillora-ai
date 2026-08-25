import { useState } from "react";
import "../styles/notes.css";

import DashboardLayout from "../layouts/DashboardLayout";

import AINotesGenerator from "../components/notes/AINotesGenerator";

import AIAssistantButton from "../components/common/AIAssistantButton";
import Footer from "../components/common/Footer";

function Notes() {
  const [showAIGenerator, setShowAIGenerator] =
    useState(false);

  return (
    <DashboardLayout>
      <div className="notes-page">

        <div className="notes-container">

          {/* HERO SECTION */}
          <section className="notes-hero">

            <div className="notes-hero-glow notes-glow-one" />
            <div className="notes-hero-glow notes-glow-two" />

            <div className="notes-hero-content">

              <div className="notes-badge">
                ✦ AI POWERED LEARNING
              </div>

              <h1>
                Generate smarter
                <span> notes with AI.</span>
              </h1>

              <p>
                Turn any topic into clear, structured,
                and easy-to-understand learning notes.
              </p>

              {!showAIGenerator && (
                <button
                  type="button"
                  className="generate-notes-button"
                  onClick={() =>
                    setShowAIGenerator(true)
                  }
                >
                  ✦ Generate Notes
                </button>
              )}

            </div>

          </section>

          {/* AI NOTES SECTION */}
          <section className="notes-generator-section">

            {showAIGenerator ? (

              <div className="notes-generator-wrapper">

                <button
                  type="button"
                  className="notes-close-button"
                  onClick={() =>
                    setShowAIGenerator(false)
                  }
                >
                  ✕
                </button>

                <AINotesGenerator />

              </div>

            ) : (

              <div className="notes-empty-preview">

                <div className="notes-empty-icon">
                  ✦
                </div>

                <h2>
                  Your AI-generated notes
                  will appear here.
                </h2>

                <p>
                  Click the Generate Notes button, enter
                  your topic, and let AI create structured
                  learning content for you.
                </p>

              </div>

            )}

          </section>

        </div>

      </div>

      <Footer />

      <AIAssistantButton />
    </DashboardLayout>
  );
}

export default Notes;