import React, { useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import PromptSuggestions from "./PromptSuggestions";

const N8N_ASSISTANT_WEBHOOK =
  "http://localhost:5678/webhook-test/skillora-ai";

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSendMessage = async (message) => {
    const trimmedMessage = message?.trim();

    if (!trimmedMessage || loading) {
      return;
    }

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

      if (!response.ok) {
        throw new Error(
          `n8n request failed: ${response.status} ${response.statusText}`
        );
      }

      const responseText =
        await response.text();

      if (!responseText.trim()) {
        throw new Error(
          "n8n returned an empty response."
        );
      }

      let result;

      try {
        result = JSON.parse(responseText);
      } catch {
        throw new Error(
          "n8n returned an invalid response."
        );
      }

      let aiResponse = "";

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

      if (!aiResponse) {
        aiResponse =
          "I received your message, but I couldn't find the AI response from n8n.";
      }

      const aiMessage = {
        id: Date.now() + 1,
        message: String(aiResponse),
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        aiMessage,
      ]);
    } catch (error) {
      console.error(
        "Skillora AI Coach Error:",
        error
      );

      const errorMessage = {
        id: Date.now() + 1,
        message:
          `Sorry, I couldn't connect to Skillora AI right now.\n\n${error.message}`,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
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

  const handleSelectPrompt = (prompt) => {
    handleSendMessage(prompt);
  };

  const handleClearChat = () => {
    if (loading) {
      return;
    }

    setMessages([]);
  };

  return (
    <div className="premium-chat-window">
      <ChatHeader
        onClearChat={handleClearChat}
      />

      <div className="premium-chat-body">
        {messages.length === 0 ? (
          <div className="premium-chat-empty">
            <PromptSuggestions
              onSelectPrompt={handleSelectPrompt}
            />
          </div>
        ) : (
          <div className="premium-message-list">
            {messages.map((item) => (
              <MessageBubble
                key={item.id}
                message={item.message}
                isUser={item.isUser}
                timestamp={item.timestamp}
              />
            ))}

            {loading && (
              <div className="premium-thinking-row">
                <div className="premium-message-avatar ai">
                  ✦
                </div>

                <div className="premium-thinking-content">
                  <div className="premium-thinking-label">
                    Skillora AI is thinking
                  </div>

                  <div className="premium-thinking-bubble">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>
        )}
      </div>

      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={loading}
      />
    </div>
  );
}

export default ChatWindow;