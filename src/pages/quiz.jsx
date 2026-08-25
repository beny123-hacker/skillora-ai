import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/quiz.css";

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

  const [selectedAnswer, setSelectedAnswer] =
    useState(null);

  const [userAnswers, setUserAnswers] =
    useState({});

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
      alert(
        "Please select or enter a topic first."
      );
      return;
    }

    setLoading(true);

    const selectedTopicData = topics.find(
      (topic) => topic.id === selectedTopic
    );

    const topicName =
      selectedTopicData?.name ||
      selectedTopic.trim();

    const requestedQuestionCount =
      Number(questionCount);

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

      const response = await fetch(
        "http://localhost:5678/webhook-test/skillora-ai",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(
            quizRequest
          ),
        }
      );

      if (!response.ok) {
        throw new Error(
          `n8n request failed: ${response.status}`
        );
      }

      const result =
        await response.json();

      console.log(
        "RAW N8N RESPONSE:",
        result
      );

      // =====================================================
      // EXTRACT QUESTIONS
      // =====================================================

      let generatedQuestions = [];

      if (
        result &&
        Array.isArray(result.questions)
      ) {
        generatedQuestions =
          result.questions;
      }

      else if (
        Array.isArray(result) &&
        Array.isArray(
          result[0]?.questions
        )
      ) {
        generatedQuestions =
          result[0].questions;
      }

      else if (
        Array.isArray(
          result?.data?.questions
        )
      ) {
        generatedQuestions =
          result.data.questions;
      }

      else if (
        Array.isArray(
          result?.output?.questions
        )
      ) {
        generatedQuestions =
          result.output.questions;
      }

      else if (
        typeof result?.output ===
        "string"
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

      else if (
        Array.isArray(
          result?.output
        )
      ) {

        generatedQuestions =
          result.output;
      }

      // =====================================================
      // CLEAN QUESTIONS
      // =====================================================

      if (
        !Array.isArray(
          generatedQuestions
        )
      ) {
        generatedQuestions = [];
      }

      generatedQuestions =
        generatedQuestions.filter(
          (question) =>
            question &&
            typeof question ===
              "object" &&
            question.question
        );

      console.log(
        "Questions received from n8n:",
        generatedQuestions.length
      );

      // =====================================================
      // QUESTION COUNT PROTECTION
      // =====================================================

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

      // =====================================================
      // NO QUESTIONS
      // =====================================================

      if (
        finalQuestions.length === 0
      ) {

        console.error(
          "No quiz questions were found.",
          result
        );

        alert(
          "The AI workflow responded, but no quiz questions were found."
        );

        return;
      }

      // =====================================================
      // SET QUIZ
      // =====================================================

      setQuestions(
        finalQuestions
      );

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

  const handleAnswerSelect = (
    answer
  ) => {

    setSelectedAnswer(answer);

    setUserAnswers(
      (previous) => ({
        ...previous,
        [currentQuestion]:
          answer,
      })
    );
  };

  // =========================================================
  // NEXT
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

      setCurrentQuestion(
        nextQuestion
      );

      setSelectedAnswer(
        userAnswers[
          nextQuestion
        ] || null
      );
    }
  };

  // =========================================================
  // BACK
  // =========================================================

  const handleBack = () => {

    if (currentQuestion > 1) {

      const previousQuestion =
        currentQuestion - 1;

      setCurrentQuestion(
        previousQuestion
      );

      setSelectedAnswer(
        userAnswers[
          previousQuestion
        ] || null
      );

      return;
    }

    setQuizStarted(false);

    setQuestions([]);

    setCurrentQuestion(1);

    setSelectedAnswer(null);

    setUserAnswers({});
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (
      <div className="quiz-page">

        <div className="quiz-loading-wrapper">

          <QuizLoading
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
            questionCount={
              questionCount
            }
          />

        </div>

      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="quiz-page">

      {/* =====================================================
          PREMIUM HEADER
      ====================================================== */}

      <header className="quiz-page-header">

        <div className="quiz-header-inner">

          <div className="quiz-brand-area">

            <button
              type="button"
              onClick={() =>
                navigate("/")
              }
              className="quiz-dashboard-link"
            >
              <span>
                ←
              </span>

              Back to Dashboard
            </button>

            <div className="quiz-brand-title">
              <span>
                AI Quiz
              </span>

              <span className="quiz-brand-icon">
                ✦
              </span>
            </div>

            <p>
              Test your knowledge with
              Skillora AI.
            </p>

          </div>


          <div className="quiz-powered-card">

            <span>
              POWERED BY
            </span>

            <strong>
              Skillora AI
            </strong>

          </div>

        </div>

      </header>


      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="quiz-main">

        {!quizStarted ? (

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