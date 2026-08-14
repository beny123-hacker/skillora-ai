import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import QuizSetup from "../components/quiz/QuizSetup";
import QuizLoading from "../components/quiz/QuizLoading";
import Quiz from "../components/quiz/Quiz";

function QuizPage() {
  const navigate = useNavigate();

  // =========================================================
  // QUIZ SETTINGS
  // =========================================================

  const [selectedTopic, setSelectedTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [questionCount, setQuestionCount] = useState(10);

  // =========================================================
  // QUIZ STATE
  // =========================================================

  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Stores:
  // {
  //   1: "B",
  //   2: "C",
  //   3: "A"
  // }

  const [userAnswers, setUserAnswers] = useState({});

  // =========================================================
  // TOPICS
  // =========================================================

  const topics = [
    {
      id: "javascript",
      name: "JavaScript",
      icon: "🟨",
      description:
        "JavaScript fundamentals, ES6+, DOM and concepts.",
    },
    {
      id: "react",
      name: "React",
      icon: "⚛️",
      description:
        "Components, hooks, state and modern React.",
    },
    {
      id: "python",
      name: "Python",
      icon: "🐍",
      description:
        "Python programming and problem solving.",
    },
    {
      id: "java",
      name: "Java",
      icon: "☕",
      description:
        "Java programming and OOP concepts.",
    },
    {
      id: "sql",
      name: "SQL",
      icon: "🗄️",
      description:
        "Queries, databases and SQL concepts.",
    },
    {
      id: "datastructures",
      name: "Data Structures",
      icon: "🌳",
      description:
        "Arrays, trees, graphs and algorithms.",
    },
  ];

  // =========================================================
  // START QUIZ
  // =========================================================

  const handleStartQuiz = async () => {
    if (!selectedTopic.trim()) {
      alert("Please select or enter a topic first.");
      return;
    }

    setLoading(true);

    // ---------------------------------------------------------
    // GET TOPIC NAME
    // ---------------------------------------------------------

    const selectedTopicData = topics.find(
      (topic) => topic.id === selectedTopic
    );

    const topicName =
      selectedTopicData?.name || selectedTopic.trim();

    // ---------------------------------------------------------
    // IMPORTANT
    // Send EXACT values selected by the user.
    // ---------------------------------------------------------

    const requestedQuestionCount = Number(questionCount);

    const quizRequest = {
      module: "quiz",
      topic: topicName,
      difficulty: difficulty,
      questionCount: requestedQuestionCount,
    };

    console.log(
      "========================================"
    );

    console.log(
      "QUIZ REQUEST SENT TO N8N:",
      quizRequest
    );

    console.log(
      "Requested question count:",
      requestedQuestionCount
    );

    console.log(
      "Requested difficulty:",
      difficulty
    );

    console.log(
      "Requested topic:",
      topicName
    );

    console.log(
      "========================================"
    );

    try {
      // -------------------------------------------------------
      // N8N REQUEST
      // -------------------------------------------------------

      const response = await fetch(
        "http://localhost:5678/webhook-test/skillora-ai",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(quizRequest),
        }
      );

      if (!response.ok) {
        throw new Error(
          `n8n request failed: ${response.status}`
        );
      }

      const result = await response.json();

      console.log(
        "RAW N8N RESPONSE:",
        result
      );

      // =======================================================
      // EXTRACT QUESTIONS
      // =======================================================

      let generatedQuestions = [];

      // -------------------------------------------------------
      // CASE 1
      // n8n returns:
      //
      // {
      //   questions: [...]
      // }
      // -------------------------------------------------------

      if (
        result &&
        Array.isArray(result.questions)
      ) {
        generatedQuestions = result.questions;
      }

      // -------------------------------------------------------
      // CASE 2
      // n8n returns:
      //
      // [
      //   {
      //     questions: [...]
      //   }
      // ]
      // -------------------------------------------------------

      else if (
        Array.isArray(result) &&
        Array.isArray(result[0]?.questions)
      ) {
        generatedQuestions = result[0].questions;
      }

      // -------------------------------------------------------
      // CASE 3
      // n8n returns:
      //
      // {
      //   data: {
      //     questions: [...]
      //   }
      // }
      // -------------------------------------------------------

      else if (
        Array.isArray(result?.data?.questions)
      ) {
        generatedQuestions =
          result.data.questions;
      }

      // -------------------------------------------------------
      // CASE 4
      // n8n returns:
      //
      // {
      //   output: {
      //     questions: [...]
      //   }
      // }
      // -------------------------------------------------------

      else if (
        Array.isArray(result?.output?.questions)
      ) {
        generatedQuestions =
          result.output.questions;
      }

      // -------------------------------------------------------
      // CASE 5
      // output is JSON STRING
      // -------------------------------------------------------

      else if (
        typeof result?.output === "string"
      ) {
        try {
          const parsedOutput =
            JSON.parse(result.output);

          if (
            Array.isArray(parsedOutput)
          ) {
            if (
              Array.isArray(
                parsedOutput[0]?.questions
              )
            ) {
              generatedQuestions =
                parsedOutput[0].questions;
            } else {
              generatedQuestions =
                parsedOutput;
            }
          } else if (
            Array.isArray(
              parsedOutput?.questions
            )
          ) {
            generatedQuestions =
              parsedOutput.questions;
          }
        } catch (error) {
          console.error(
            "Unable to parse n8n output:",
            error
          );
        }
      }

      // -------------------------------------------------------
      // CASE 6
      // Sometimes output itself can be an array
      // -------------------------------------------------------

      else if (
        Array.isArray(result?.output)
      ) {
        generatedQuestions =
          result.output;
      }

      // =======================================================
      // CLEAN QUESTIONS
      // =======================================================

      if (!Array.isArray(generatedQuestions)) {
        generatedQuestions = [];
      }

      // Remove empty / invalid items.

      generatedQuestions =
        generatedQuestions.filter(
          (question) =>
            question &&
            typeof question === "object" &&
            question.question
        );

      console.log(
        "Questions received from n8n:",
        generatedQuestions.length
      );

      // =======================================================
      // IMPORTANT QUESTION COUNT PROTECTION
      // =======================================================

      // The frontend NEVER creates extra questions.
      //
      // If user selected 5:
      // maximum = 5
      //
      // If user selected 10:
      // maximum = 10
      //
      // If user selected 15:
      // maximum = 15
      //
      // etc.

      const finalQuestions =
        generatedQuestions.slice(
          0,
          requestedQuestionCount
        );

      console.log(
        "Requested questions:",
        requestedQuestionCount
      );

      console.log(
        "Final questions used:",
        finalQuestions.length
      );

      // =======================================================
      // NO QUESTIONS
      // =======================================================

      if (finalQuestions.length === 0) {
        console.error(
          "No quiz questions were found.",
          result
        );

        alert(
          "The AI workflow responded, but no quiz questions were found."
        );

        return;
      }

      // =======================================================
      // IMPORTANT
      // If n8n returned LESS questions than requested,
      // do NOT pretend there are more.
      //
      // Example:
      // User chooses 5
      // n8n returns 5 -> use 5
      //
      // User chooses 5
      // n8n returns 10 -> use first 5
      //
      // User chooses 10
      // n8n returns 5 -> use 5
      // =======================================================

      setQuestions(finalQuestions);

      setCurrentQuestion(1);

      setSelectedAnswer(null);

      setUserAnswers({});

      setQuizStarted(true);
    } catch (error) {
      console.error(
        "Quiz generation error:",
        error
      );

      alert(
        "Unable to connect to the Skillora AI workflow. Make sure n8n is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // ANSWER SELECT
  // =========================================================

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);

    setUserAnswers((previous) => ({
      ...previous,
      [currentQuestion]: answer,
    }));
  };

  // =========================================================
  // NEXT QUESTION
  // =========================================================

  const handleNext = () => {
    if (!selectedAnswer) {
      return;
    }

    if (
      currentQuestion <
      questions.length
    ) {
      const nextQuestion =
        currentQuestion + 1;

      setCurrentQuestion(nextQuestion);

      setSelectedAnswer(
        userAnswers[nextQuestion] || null
      );
    }
  };

  // =========================================================
  // BACK
  // =========================================================

  const handleBack = () => {
    // -------------------------------------------------------
    // Go to previous question
    // -------------------------------------------------------

    if (currentQuestion > 1) {
      const previousQuestion =
        currentQuestion - 1;

      setCurrentQuestion(
        previousQuestion
      );

      setSelectedAnswer(
        userAnswers[previousQuestion] || null
      );

      return;
    }

    // -------------------------------------------------------
    // If on first question,
    // return to quiz setup
    // -------------------------------------------------------

    setQuizStarted(false);

    setQuestions([]);

    setCurrentQuestion(1);

    setSelectedAnswer(null);

    setUserAnswers({});
  };

  // =========================================================
  // LOADING PAGE
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">

        <div className="mx-auto flex min-h-screen w-full max-w-[1500px] items-center justify-center px-6 py-10 lg:px-10">

          <QuizLoading
            topic={
              topics.find(
                (topic) =>
                  topic.id === selectedTopic
              )?.name || selectedTopic
            }
            difficulty={difficulty}
            questionCount={questionCount}
          />

        </div>

      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-white/10 bg-slate-900/70 backdrop-blur-xl">

        <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-6 py-5 lg:px-10">

          {/* LEFT */}

          <div>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mb-2 text-sm text-slate-400 transition hover:text-white"
            >
              ← Back to Dashboard
            </button>

            <h1 className="text-3xl font-bold sm:text-4xl">
              AI Quiz 🧠
            </h1>

            <p className="mt-1 text-slate-400">
              Test your knowledge with Skillora AI.
            </p>

          </div>

          {/* RIGHT */}

          <div className="hidden rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-5 py-3 text-right sm:block">

            <p className="text-xs text-slate-400">
              Powered by
            </p>

            <p className="font-semibold text-indigo-400">
              Skillora AI
            </p>

          </div>

        </div>

      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto w-full max-w-[1500px] px-6 py-8 lg:px-10 xl:py-10">

        {!quizStarted ? (

          // ===================================================
          // QUIZ SETUP
          // ===================================================

          <QuizSetup
            topics={topics}

            selectedTopic={
              selectedTopic
            }

            setSelectedTopic={
              setSelectedTopic
            }

            difficulty={
              difficulty
            }

            setDifficulty={
              setDifficulty
            }

            questionCount={
              questionCount
            }

            setQuestionCount={
              setQuestionCount
            }

            onStartQuiz={
              handleStartQuiz
            }

            loading={
              loading
            }
          />

        ) : (

          // ===================================================
          // QUIZ
          // ===================================================

          <Quiz

            topic={
              topics.find(
                (topic) =>
                  topic.id ===
                  selectedTopic
              )?.name ||
              selectedTopic
            }

            difficulty={
              difficulty
            }

            /*
             * IMPORTANT:
             *
             * Use the actual questions received
             * from n8n.
             *
             * This prevents the UI from pretending
             * there are 10 questions when there
             * aren't.
             */

            questionCount={
              questions.length
            }

            currentQuestion={
              currentQuestion
            }

            questions={
              questions
            }

            selectedAnswer={
              selectedAnswer
            }

            userAnswers={
              userAnswers
            }

            onAnswerSelect={
              handleAnswerSelect
            }

            onNext={
              handleNext
            }

            onBack={
              handleBack
            }

          />

        )}

      </main>

    </div>
  );
}

export default QuizPage;