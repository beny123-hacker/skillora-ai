import { useState } from "react";

import {
  FaArrowDown,
  FaCheckCircle,
  FaCompass,
  FaExclamationTriangle,
  FaStar,
  FaRedo,
  FaRoad,
  FaSpinner,
} from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";

import "../styles/roadmap.css";
import RoadmapHero from "../components/roadmap/RoadmapHero";
import CareerSelector from "../components/roadmap/CareerSelector";
import RoadmapTimeline from "../components/roadmap/RoadmapTimeline";
import ProgressOverview from "../components/roadmap/ProgressOverview";
import ProgressTracker from "../components/roadmap/ProgressTracker";
import RecommendedResources from "../components/roadmap/RecommendedResources";
import AIAssistantButton from "../components/common/AIAssistantButton";
import Footer from "../components/common/Footer";
// ============================================================
// N8N WEBHOOK URL
// ============================================================

const N8N_WEBHOOK_URL =
  "http://localhost:5678/webhook-test/skillora-ai";


// ============================================================
// ROADMAP PAGE
// ============================================================

function Roadmap() {

  // ==========================================================
  // SELECTED CAREER
  // ==========================================================

  const [selectedCareer, setSelectedCareer] =
    useState("");


  // ==========================================================
  // GENERATED ROADMAP
  // ==========================================================

  const [roadmapData, setRoadmapData] =
    useState(null);


  // ==========================================================
  // LOADING
  // ==========================================================

  const [isGenerating, setIsGenerating] =
    useState(false);


  // ==========================================================
  // ERROR
  // ==========================================================

  const [error, setError] =
    useState("");


  // ==========================================================
  // SCROLL TO ROADMAP
  // ==========================================================

  const scrollToRoadmap = () => {

    document
      .getElementById("generated-roadmap")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

  };


  // ==========================================================
  // RESET ROADMAP
  // ==========================================================

  const handleResetRoadmap = () => {

    setRoadmapData(null);

    setSelectedCareer("");

    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  // ==========================================================
  // GENERATE ROADMAP
  // ==========================================================

  const handleGenerateRoadmap =
    async (careerData) => {

      // ------------------------------------------------------
      // VALIDATE CAREER DATA
      // ------------------------------------------------------

      if (
        !careerData ||
        !careerData.category ||
        !careerData.role
      ) {

        setError(
          "Please select a career category and role before generating your roadmap."
        );

        return;

      }


      // ------------------------------------------------------
      // CAREER DATA
      // ------------------------------------------------------

      const careerCategory =
        careerData.category;

      const careerRole =
        careerData.role;


      // ------------------------------------------------------
      // SET SELECTED CAREER
      // ------------------------------------------------------

      setSelectedCareer(
        `${careerRole}`
      );


      // ------------------------------------------------------
      // REQUEST DATA
      // ------------------------------------------------------

      const requestData = {
        module: "roadmap",

        career_category:
          careerCategory,

        career_role:
          careerRole,
      };


      setError("");

      setRoadmapData(null);

      setIsGenerating(true);


      try {

        // ====================================================
        // CALL N8N WEBHOOK
        // ====================================================

        const response =
          await fetch(
            N8N_WEBHOOK_URL,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Accept:
                  "application/json",
              },

              body:
                JSON.stringify(
                  requestData
                ),
            }
          );


        // ====================================================
        // READ RESPONSE
        // ====================================================

        const responseText =
          await response.text();


        // ====================================================
        // HTTP ERROR
        // ====================================================

        if (!response.ok) {

          throw new Error(
            `n8n request failed: ${response.status} ${response.statusText}`
          );

        }


        // ====================================================
        // EMPTY RESPONSE
        // ====================================================

        if (!responseText.trim()) {

          throw new Error(
            "n8n returned an empty response. Check your Respond to Webhook node."
          );

        }


        // ====================================================
        // PARSE JSON
        // ====================================================

        let result;

        try {

          result =
            JSON.parse(
              responseText
            );

        } catch {

          throw new Error(
            "n8n returned invalid JSON."
          );

        }


        // ====================================================
        // EXTRACT ROADMAP
        // ====================================================

        let generatedRoadmap =
          result;


        // Case 1
        // { output: {...} }

        if (
          result &&
          typeof result === "object" &&
          result.output &&
          typeof result.output === "object"
        ) {

          generatedRoadmap =
            result.output;

        }


        // Case 2
        // { data: {...} }

        else if (
          result &&
          typeof result === "object" &&
          result.data &&
          typeof result.data === "object"
        ) {

          generatedRoadmap =
            result.data;

        }


        // Case 3
        // { body: {...} }

        else if (
          result &&
          typeof result === "object" &&
          result.body &&
          typeof result.body === "object"
        ) {

          generatedRoadmap =
            result.body;

        }


        // ====================================================
        // HANDLE STRINGIFIED JSON
        // ====================================================

        if (
          typeof generatedRoadmap ===
          "string"
        ) {

          try {

            generatedRoadmap =
              JSON.parse(
                generatedRoadmap
              );

          } catch {

            throw new Error(
              "The roadmap returned by n8n is not valid JSON."
            );

          }

        }


        // ====================================================
        // VALIDATE ROADMAP
        // ====================================================

        if (
          !generatedRoadmap ||
          typeof generatedRoadmap !==
          "object"
        ) {

          throw new Error(
            "No valid roadmap data was received from n8n."
          );

        }


        // ====================================================
        // SAVE ROADMAP
        // ====================================================

        setRoadmapData(
          generatedRoadmap
        );


        // ====================================================
        // SCROLL TO GENERATED ROADMAP
        // ====================================================

        setTimeout(() => {

          document
            .getElementById(
              "generated-roadmap"
            )
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });

        }, 300);


      } catch (err) {

        console.error(
          "Roadmap generation error:",
          err
        );


        if (
          err?.message ===
          "Failed to fetch"
        ) {

          setError(
            "Cannot connect to n8n. Make sure n8n is running and the roadmap webhook is active."
          );

        } else {

          setError(
            err?.message ||
            "Something went wrong while generating the roadmap."
          );

        }


        setRoadmapData(null);


      } finally {

        setIsGenerating(false);

      }

    };


  return (

    <DashboardLayout>

      <main className="roadmap-page">

        {/* BACKGROUND */}

        <div className="roadmap-background">

          <div className="roadmap-orb roadmap-orb-one" />

          <div className="roadmap-orb roadmap-orb-two" />

          <div className="roadmap-grid" />

        </div>


        {/* MAIN CONTENT */}

        <div className="roadmap-container">


          {/* PAGE HEADER */}

          <section className="roadmap-topbar">

            <div className="roadmap-topbar-left">

              <div className="roadmap-icon-box">

                <FaCompass />

              </div>


              <div>

                <span className="roadmap-eyebrow">
                  CAREER INTELLIGENCE
                </span>

                <h1>
                  Your AI Career Roadmap
                </h1>

                <p>
                  Turn your career ambition into a
                  clear, structured learning journey.
                </p>

              </div>

            </div>


            <div className="roadmap-topbar-actions">

              {roadmapData ? (

                <>

                  <button
                    type="button"
                    className="roadmap-secondary-button"
                    onClick={scrollToRoadmap}
                  >

                    View Roadmap

                    <FaArrowDown />

                  </button>


                  <button
                    type="button"
                    className="roadmap-reset-button"
                    onClick={handleResetRoadmap}
                  >

                    <FaRedo />

                    Start Over

                  </button>

                </>

              ) : (

                <div className="roadmap-status-pill">

                  <span />

                  AI Ready

                </div>

              )}

            </div>

          </section>


          {/* HERO */}

          <section className="roadmap-section roadmap-hero-section">

            <RoadmapHero
              selectedCareer={selectedCareer}
              roadmapData={roadmapData}
            />

          </section>


          {/* ROADMAP GENERATOR */}

          <section className="roadmap-generator-section">

            <div className="roadmap-generator-header">

              <div>

                <div className="roadmap-generator-badge">

                  <FaStar />

                  PERSONALIZED BY AI

                </div>


                <h2>
                  Design Your Learning Journey
                </h2>


                <p>
                  Choose your career path and let
                  Skillora AI create a personalized
                  step-by-step roadmap.
                </p>

              </div>


              <div className="roadmap-generator-step">

                <span>
                  01
                </span>

                <div>

                  <strong>
                    Choose your goal
                  </strong>

                  <p>
                    AI builds the path
                  </p>

                </div>

              </div>

            </div>


            <CareerSelector
              onGenerateRoadmap={
                handleGenerateRoadmap
              }
              loading={
                isGenerating
              }
            />

          </section>


          {/* LOADING */}

          {isGenerating && (

            <section className="roadmap-loading-card">

              <div className="roadmap-loading-visual">

                <div className="roadmap-loading-ring" />

                <div className="roadmap-loading-icon">

                  <FaRoad />

                </div>

              </div>


              <div className="roadmap-loading-content">

                <span>
                  SKILLORA AI IS THINKING
                </span>

                <h2>
                  Building your personalized roadmap...
                </h2>

                <p>
                  Analyzing your career goal and
                  organizing the skills you need
                  into a structured learning path.
                </p>

                <div className="roadmap-loading-steps">

                  <div>

                    <FaCheckCircle />

                    Analyzing career requirements

                  </div>


                  <div className="roadmap-loading-active">

                    <FaSpinner />

                    Designing learning milestones

                  </div>


                  <div>

                    <span className="roadmap-empty-dot" />

                    Preparing recommended resources

                  </div>

                </div>

              </div>

            </section>

          )}


          {/* ERROR */}

          {error && (

            <section className="roadmap-error-card">

              <div className="roadmap-error-icon">

                <FaExclamationTriangle />

              </div>


              <div className="roadmap-error-content">

                <span>
                  ROADMAP GENERATION FAILED
                </span>

                <h3>
                  We couldn't generate your roadmap
                </h3>

                <p>
                  {error}
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  setError("")
                }
              >

                Dismiss

              </button>

            </section>

          )}


          {/* EMPTY STATE */}

          {!roadmapData &&
            !isGenerating &&
            !error && (

              <section className="roadmap-welcome-card">

                <div className="roadmap-welcome-icon">

                  <FaRoad />

                </div>


                <div className="roadmap-welcome-content">

                  <span>
                    YOUR JOURNEY STARTS HERE
                  </span>

                  <h2>
                    Select a career and let AI
                    map the journey.
                  </h2>

                  <p>
                    Your roadmap will include
                    learning milestones, skill
                    recommendations, progress
                    tracking and curated resources.
                  </p>

                </div>


                <div className="roadmap-feature-list">

                  <div>

                    <span>01</span>

                    Personalized Path

                  </div>

                  <div>

                    <span>02</span>

                    Skill Milestones

                  </div>

                  <div>

                    <span>03</span>

                    AI Resources

                  </div>

                </div>

              </section>

            )}


          {/* GENERATED ROADMAP */}

          {roadmapData && (

            <section
              id="generated-roadmap"
              className="roadmap-results scroll-mt-8"
            >

              <div className="roadmap-results-header">

                <div>

                  <span className="roadmap-results-badge">

                    <FaCheckCircle />

                    ROADMAP GENERATED

                  </span>


                  <h2>
                    Your Personalized Learning Plan
                  </h2>


                  <p>

                    {selectedCareer
                      ? `Your AI-powered roadmap for becoming a ${selectedCareer}.`
                      : "Your AI-powered learning journey is ready."}

                  </p>

                </div>


                <div className="roadmap-ready-card">

                  <span className="roadmap-ready-dot" />

                  <div>

                    <strong>
                      Roadmap Ready
                    </strong>

                    <p>
                      Start with your first milestone
                    </p>

                  </div>

                </div>

              </div>


              <div className="roadmap-content-block">

                <ProgressOverview
                  roadmapData={roadmapData}
                />

              </div>


              <div className="roadmap-content-block">

                <RoadmapTimeline
                  roadmapData={roadmapData}
                />

              </div>


              <div className="roadmap-content-block">

                <ProgressTracker
                  roadmapData={roadmapData}
                />

              </div>


              <div className="roadmap-content-block roadmap-last-block">

                <RecommendedResources
                  roadmapData={roadmapData}
                />

              </div>

            </section>

          )}

        </div>

      </main>


      <Footer />

      <AIAssistantButton />

    </DashboardLayout>

  );

}

export default Roadmap;