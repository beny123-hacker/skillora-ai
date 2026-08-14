import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn(
    "VITE_GEMINI_API_KEY is missing. Add it to your .env file."
  );
}

const genAI = API_KEY
  ? new GoogleGenerativeAI(API_KEY)
  : null;

const model = genAI
  ? genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    })
  : null;

/**
 * Send a message to Skillora AI.
 *
 * @param {string} message - Student's question
 * @param {Array} conversation - Previous conversation
 * @returns {Promise<string>} AI response
 */
export async function askAI(message, conversation = []) {
  if (!message || !message.trim()) {
    throw new Error("Message cannot be empty.");
  }

  if (!model) {
    throw new Error(
      "Gemini API key is missing. Please configure VITE_GEMINI_API_KEY."
    );
  }

  try {
    // Keep only the latest messages to avoid unnecessarily
    // large requests.
    const recentConversation = conversation
      .slice(-10)
      .map((item) => ({
        role: item.isUser ? "user" : "model",
        parts: [
          {
            text: item.message,
          },
        ],
      }));

    const systemInstruction = `
You are Skillora AI Assistant, an intelligent learning assistant
for college students.

Your responsibilities:

1. Explain technical concepts in simple language.
2. Help students understand programming and computer science topics.
3. Help students create learning roadmaps.
4. Help students prepare for exams and interviews.
5. Generate study notes when requested.
6. Help students identify what they should learn next.
7. Encourage practical learning and projects.
8. Give concise but useful answers.
9. Use examples whenever they improve understanding.
10. Do not overwhelm beginners with unnecessary technical terms.

The student is using Skillora AI, a personalized learning platform.

When explaining a difficult concept:
- Start with a simple explanation.
- Give a small example.
- Mention important points.
- Use code examples when appropriate.

If the student asks for a roadmap:
- Break it into levels or stages.
- Mention prerequisites.
- Suggest practical projects.

Always be friendly, encouraging and educational.
`;

    const prompt = `
${systemInstruction}

Previous conversation:
${JSON.stringify(recentConversation)}

Student's new question:
${message}

Answer the student's question clearly and helpfully.
`;

    const result = await model.generateContent(prompt);

    const response = result.response;

    const text = response.text();

    if (!text) {
      throw new Error("AI returned an empty response.");
    }

    return text.trim();
  } catch (error) {
    console.error("Skillora AI Error:", error);

    if (
      error?.message?.includes("API_KEY_INVALID") ||
      error?.message?.includes("API key")
    ) {
      throw new Error(
        "The Gemini API key is invalid. Please check your .env file."
      );
    }

    throw new Error(
      "Unable to get a response from Skillora AI. Please try again."
    );
  }
}