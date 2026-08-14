import React, { useState } from "react";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import PromptSuggestions from "./PromptSuggestions";


// ============================================================
// N8N ASSISTANT WEBHOOK
// ============================================================

const N8N_ASSISTANT_WEBHOOK =
  "http://localhost:5678/webhook-test/skillora-ai";


// ============================================================
// CHAT WINDOW
// ============================================================

function ChatWindow() {

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);


  // ==========================================================
  // SEND MESSAGE
  // ==========================================================

  const handleSendMessage = async (message) => {

    const trimmedMessage = message?.trim();

    if (!trimmedMessage || loading) {
      return;
    }


    // ========================================================
    // USER MESSAGE
    // ========================================================

    const userMessage = {
      id: Date.now(),
      message: trimmedMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };


    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);


    setLoading(true);


    try {

      // ======================================================
      // SEND TO N8N
      // ======================================================

      console.log(
        "Sending message to n8n:",
        trimmedMessage
      );


      const response = await fetch(
        N8N_ASSISTANT_WEBHOOK,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: trimmedMessage,
            module: "assistant",
          }),
        }
      );


      // ======================================================
      // CHECK HTTP RESPONSE
      // ======================================================

      if (!response.ok) {

        throw new Error(
          `n8n request failed: ${response.status} ${response.statusText}`
        );

      }


      // ======================================================
      // READ RESPONSE
      // ======================================================

      const responseText =
        await response.text();


      console.log(
        "Raw n8n response:",
        responseText
      );


      if (!responseText.trim()) {

        throw new Error(
          "n8n returned an empty response."
        );

      }


      // ======================================================
      // PARSE RESPONSE
      // ======================================================

      let result;

      try {

        result = JSON.parse(responseText);

      } catch (error) {

        console.error(
          "Invalid JSON returned by n8n:",
          responseText
        );

        throw new Error(
          "n8n returned an invalid response."
        );

      }


      console.log(
        "n8n assistant response:",
        result
      );


      // ======================================================
      // EXTRACT AI RESPONSE
      // ======================================================

      let aiResponse = "";


      /*
        Supports several possible Respond to Webhook
        structures.

        Example 1:

        {
          "response": "Hello!"
        }

        Example 2:

        {
          "output": "Hello!"
        }

        Example 3:

        {
          "message": "Hello!"
        }

        Example 4:

        {
          "text": "Hello!"
        }

        Example 5:

        {
          "data": {
            "response": "Hello!"
          }
        }
      */


      if (typeof result === "string") {

        aiResponse = result;

      } else if (result?.response) {

        aiResponse = result.response;

      } else if (result?.output) {

        aiResponse = result.output;

      } else if (result?.message) {

        aiResponse = result.message;

      } else if (result?.text) {

        aiResponse = result.text;

      } else if (
        result?.data &&
        typeof result.data === "object"
      ) {

        aiResponse =
          result.data.response ||
          result.data.output ||
          result.data.message ||
          result.data.text ||
          "";

      }


      // ======================================================
      // STRINGIFIED AI RESPONSE
      // ======================================================

      if (
        typeof aiResponse === "object" &&
        aiResponse !== null
      ) {

        aiResponse =
          aiResponse.response ||
          aiResponse.output ||
          aiResponse.message ||
          aiResponse.text ||
          JSON.stringify(aiResponse);

      }


      // ======================================================
      // FALLBACK
      // ======================================================

      if (!aiResponse) {

        aiResponse =
          "I received your message, but I couldn't find the AI response from n8n.";

      }


      // ======================================================
      // AI MESSAGE
      // ======================================================

      const aiMessage = {

        id: Date.now() + 1,

        message:
          String(aiResponse),

        isUser: false,

        timestamp:
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),

      };


      setMessages((previousMessages) => [

        ...previousMessages,

        aiMessage,

      ]);


    } catch (error) {

      // ======================================================
      // ERROR
      // ======================================================

      console.error(
        "Skillora AI Assistant Error:",
        error
      );


      const errorMessage = {

        id: Date.now() + 1,

        message:
          `Sorry, I couldn't connect to Skillora AI right now. 🤖\n\n${error.message}`,

        isUser: false,

        timestamp:
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),

      };


      setMessages((previousMessages) => [

        ...previousMessages,

        errorMessage,

      ]);

    } finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // SUGGESTION CLICK
  // ==========================================================

  const handleSelectPrompt = (prompt) => {

    handleSendMessage(prompt);

  };


  // ==========================================================
  // CLEAR CHAT
  // ==========================================================

  const handleClearChat = () => {

    if (loading) {
      return;
    }

    setMessages([]);

  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div className="flex h-[calc(100vh-110px)] min-h-[600px] w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <ChatHeader
        onClearChat={handleClearChat}
      />


      {/* =====================================================
          CHAT AREA
      ===================================================== */}

      <div className="min-h-0 flex-1 overflow-y-auto">

        {messages.length === 0 ? (

          /* ==================================================
             EMPTY STATE
          ================================================== */

          <div className="flex min-h-full items-center justify-center px-4 py-8">

            <PromptSuggestions
              onSelectPrompt={handleSelectPrompt}
            />

          </div>

        ) : (

          /* ==================================================
             MESSAGES
          ================================================== */

          <div className="flex w-full flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">

            {messages.map((item) => (

              <MessageBubble
                key={item.id}
                message={item.message}
                isUser={item.isUser}
                timestamp={item.timestamp}
              />

            ))}


            {/* =================================================
                AI THINKING
            ================================================= */}

            {loading && (

              <div className="flex w-full justify-start">

                <div className="flex items-end gap-2">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-sm">
                    🤖
                  </div>

                  <div className="rounded-2xl rounded-bl-sm border border-white/10 bg-slate-800 px-4 py-3">

                    <div className="flex items-center gap-1">

                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />

                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                        style={{
                          animationDelay: "0.15s",
                        }}
                      />

                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                        style={{
                          animationDelay: "0.3s",
                        }}
                      />

                    </div>

                  </div>

                </div>

              </div>

            )}

          </div>

        )}

      </div>


      {/* =====================================================
          INPUT
      ===================================================== */}

      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={loading}
      />

    </div>

  );

}

export default ChatWindow;