import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

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

  const [selectedCareer, setSelectedCareer] = useState("");

  // ==========================================================
  // GENERATED ROADMAP
  // ==========================================================

  const [roadmapData, setRoadmapData] = useState(null);

  // ==========================================================
  // LOADING
  // ==========================================================

  const [isGenerating, setIsGenerating] = useState(false);

  // ==========================================================
  // ERROR
  // ==========================================================

  const [error, setError] = useState("");

  // ==========================================================
  // GENERATE ROADMAP
  // ==========================================================

  const handleGenerateRoadmap = async (careerData) => {
    // --------------------------------------------------------
    // CHECK CAREER DATA
    // --------------------------------------------------------

    if (
      !careerData ||
      !careerData.category ||
      !careerData.role
    ) {
      setError(
        "Please select a career category and role before generating the roadmap."
      );

      return;
    }

    // --------------------------------------------------------
    // GET CATEGORY + ROLE
    // --------------------------------------------------------

    const careerCategory = careerData.category;
    const careerRole = careerData.role;

    // --------------------------------------------------------
    // REQUEST DATA
    // --------------------------------------------------------

    const requestData = {
      module: "roadmap",
      career_category: careerCategory,
      career_role: careerRole,
    };

    console.log(
      "========================================"
    );

    console.log(
      "Sending roadmap request to n8n:"
    );

    console.log(requestData);

    console.log(
      "Webhook URL:",
      N8N_WEBHOOK_URL
    );

    console.log(
      "========================================"
    );

    setError("");
    setIsGenerating(true);

    try {
      // ======================================================
      // CALL N8N WEBHOOK
      // ======================================================

      const response = await fetch(
        N8N_WEBHOOK_URL,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify(requestData),
        }
      );

      console.log(
        "n8n HTTP status:",
        response.status
      );

      // ======================================================
      // READ RESPONSE
      // ======================================================

      const responseText =
        await response.text();

      console.log(
        "Raw n8n response:",
        responseText
      );

      // ======================================================
      // HTTP ERROR
      // ======================================================

      if (!response.ok) {
        throw new Error(
          `n8n request failed: ${response.status} ${response.statusText}`
        );
      }

      // ======================================================
      // EMPTY RESPONSE
      // ======================================================

      if (!responseText.trim()) {
        throw new Error(
          "n8n returned an empty response. Check your Respond to Webhook node."
        );
      }

      // ======================================================
      // PARSE JSON
      // ======================================================

      let result;

      try {
        result = JSON.parse(responseText);
      } catch (jsonError) {
        console.error(
          "Could not parse n8n response as JSON:",
          responseText
        );

        throw new Error(
          "n8n returned invalid JSON."
        );
      }

      console.log(
        "Parsed n8n response:",
        result
      );

      // ======================================================
      // EXTRACT ROADMAP
      // ======================================================

      let generatedRoadmap = result;

      // ------------------------------------------------------
      // Case 1:
      // { output: {...} }
      // ------------------------------------------------------

      if (
        result &&
        typeof result === "object" &&
        result.output &&
        typeof result.output === "object"
      ) {
        generatedRoadmap = result.output;
      }

      // ------------------------------------------------------
      // Case 2:
      // { data: {...} }
      // ------------------------------------------------------

      else if (
        result &&
        typeof result === "object" &&
        result.data &&
        typeof result.data === "object"
      ) {
        generatedRoadmap = result.data;
      }

      // ------------------------------------------------------
      // Case 3:
      // { body: {...} }
      // ------------------------------------------------------

      else if (
        result &&
        typeof result === "object" &&
        result.body &&
        typeof result.body === "object"
      ) {
        generatedRoadmap = result.body;
      }

      // ======================================================
      // HANDLE STRING OUTPUT
      // ======================================================

      if (
        typeof generatedRoadmap ===
        "string"
      ) {
        try {
          generatedRoadmap =
            JSON.parse(
              generatedRoadmap
            );
        } catch (error) {
          console.error(
            "Stringified roadmap could not be parsed:",
            generatedRoadmap
          );

          throw new Error(
            "The roadmap returned by n8n is not valid JSON."
          );
        }
      }

      // ======================================================
      // FINAL RESULT
      // ======================================================

      console.log(
        "Final generated roadmap:",
        generatedRoadmap
      );

      // ======================================================
      // VALIDATE ROADMAP
      // ======================================================

      if (
        !generatedRoadmap ||
        typeof generatedRoadmap !== "object"
      ) {
        throw new Error(
          "No valid roadmap data was received from n8n."
        );
      }

      // ======================================================
      // CHECK REQUIRED DATA
      // ======================================================

      if (
        !generatedRoadmap.milestones &&
        !generatedRoadmap.steps &&
        !generatedRoadmap.roadmap
      ) {
        console.warn(
          "Roadmap object does not contain milestones, steps, or roadmap:",
          generatedRoadmap
        );
      }

      // ======================================================
      // SAVE ROADMAP
      // ======================================================

      setRoadmapData(
        generatedRoadmap
      );

      // ======================================================
      // SCROLL TO GENERATED ROADMAP
      // ======================================================

      setTimeout(() => {
        document
          .getElementById(
            "generated-roadmap"
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 200);
    } catch (err) {
      console.error(
        "Roadmap generation error:",
        err
      );

      // ------------------------------------------------------
      // FETCH ERROR
      // ------------------------------------------------------

      if (
        err?.message ===
        "Failed to fetch"
      ) {
        setError(
          "Cannot connect to n8n. Make sure n8n is running on http://localhost:5678 and the roadmap webhook is active."
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

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <DashboardLayout>

      <div className="min-h-screen bg-slate-950">

        <div className="mx-auto max-w-7xl space-y-10 px-8 py-8">

          {/* ==================================================
              HERO
          ================================================== */}

          <RoadmapHero
            selectedCareer={
              selectedCareer
            }
            roadmapData={
              roadmapData
            }
          />

          {/* ==================================================
              CAREER SELECTOR
          ================================================== */}

          <CareerSelector
            onGenerateRoadmap={
              handleGenerateRoadmap
            }
            loading={
              isGenerating
            }
          />

          {/* ==================================================
              ERROR
          ================================================== */}

          {error && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5">

              <div className="flex items-start gap-3">

                <span className="text-xl">
                  ⚠️
                </span>

                <div>

                  <h3 className="font-semibold text-red-300">
                    Roadmap Generation Failed
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-red-200/80">
                    {error}
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* ==================================================
              GENERATED ROADMAP
          ================================================== */}

          <div
            id="generated-roadmap"
            className="scroll-mt-8"
          >

            {/* =================================================
                PROGRESS OVERVIEW
            ================================================= */}

            <ProgressOverview
              roadmapData={
                roadmapData
              }
            />

            {/* =================================================
                ROADMAP TIMELINE
            ================================================= */}

            <RoadmapTimeline
              roadmapData={
                roadmapData
              }
            />

            {/* =================================================
                PROGRESS TRACKER
            ================================================= */}

            <ProgressTracker
              roadmapData={
                roadmapData
              }
            />

            {/* =================================================
                RECOMMENDED RESOURCES
            ================================================= */}

            <RecommendedResources
              roadmapData={
                roadmapData
              }
            />

          </div>

        </div>

      </div>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <Footer />

      {/* ======================================================
          AI ASSISTANT
      ====================================================== */}

      <AIAssistantButton />

    </DashboardLayout>
  );
}

export default Roadmap;