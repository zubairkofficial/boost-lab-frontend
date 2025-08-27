"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import ReactMarkdown from "react-markdown";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

type ChatMessage = {
  type: "user" | "bot";
  content: string;
  timestamp: number;
};

const AUDIT_QUESTIONS = [
  "Where do you live/work?",
  "What does your real portfolio look like? (cases, personal/commercial/brand work?)",
  "Which platforms do you use?",
  "What equipment/resources/team do you have?",
  "Minimum income target per project/month?",
  "Main or extra income?",
  "Target market (city/country/international)?",
  "What language(s) do you use for work?",
  "How much time per week can you invest? Any life limitations?",
  "What holds you back now? (portfolio, fear, time, etc.)",
  "Have you tried to reach brands/test shoots/teamwork? What worked/what didn’t?",
  "Regular or occasional paid work?",
];

const ProfessionalChatbot = () => {
  const { user } = useAuth();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: "bot",
      content:
        "Hi! I’m Boostie — your personal AI mentor and strategy assistant. I’ll guide you through a quick audit to shape your marketing strategy.",
      timestamp: Date.now(),
    },
    {
      type: "bot",
      content: `Question 1 of ${AUDIT_QUESTIONS.length}: ${AUDIT_QUESTIONS[0]}`,
      timestamp: Date.now(),
    },
  ]);

  const [answers, setAnswers] = useState<string[]>(
    Array(AUDIT_QUESTIONS.length).fill("")
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showDocument, setShowDocument] = useState(false);
  const [docChunks, setDocChunks] = useState<string[]>([]);
  const [displayedDoc, setDisplayedDoc] = useState<string[]>([]);

  const handleSendMessage = () => {
    if (!currentAnswer.trim()) return;

    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = currentAnswer;

    setMessages((prev) => [
      ...prev,
      { type: "user", content: currentAnswer, timestamp: Date.now() },
    ]);

    setAnswers(updatedAnswers);
    setCurrentAnswer("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      if (currentQuestion < AUDIT_QUESTIONS.length - 1) {
        const next = currentQuestion + 1;
        setCurrentQuestion(next);
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: `Thank you! Question ${next + 1} of ${
              AUDIT_QUESTIONS.length
            }: ${AUDIT_QUESTIONS[next]}`,
            timestamp: Date.now(),
          },
        ]);
      } else {
        setIsComplete(true);
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content:
              "Perfect! All questions completed. When you’re ready, click *Generate Strategy* below.",
            timestamp: Date.now(),
          },
        ]);
      }
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleGenerateStrategy = async () => {
    if (!user?.email) {
      toast.error("User email not found. Please log in.");
      return;
    }

    setIsComplete(true);
    setIsLoading(true);
    setShowDocument(true);
    setDisplayedDoc([]);
    setDocChunks([]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/agent/strategy`,
        { email: user.email, audit_answers: answers },
        { withCredentials: true }
      );
      console.log(response.data);
      const strategy: string = response.data?.strategy;
      if (!strategy) {
        toast.error("No strategy returned from server");
        setShowDocument(false);
        return;
      }
      const chunks = strategy.split("\n").filter((line: string) => line.trim());
      setDocChunks(chunks);
    } catch (err) {
      console.error(err);
      toast.error("Error submitting answers. Please try again.");
      setShowDocument(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!docChunks.length) return;
    let i = 0;
    const t = setInterval(() => {
      setDisplayedDoc((prev) => [...prev, docChunks[i]]);
      i++;
      if (i >= docChunks.length) clearInterval(t);
    }, 300);
    return () => clearInterval(t);
  }, [docChunks]);

  return (
    <div
      className="min-h-screen bg-[#2A4C57] relative overflow-auto before:absolute before:inset-0 before:bg-[#2A4C57]/60 before:z-0 flex items-center justify-center p-4"
      style={{
        backgroundImage:
          "url(https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        fontFamily: `'Unbounded', Arial, sans-serif`,
      }}
    >
      <Toaster position="top-right" />
      <div className="relative z-10 w-full max-w-6xl h-[90vh] bg-[#537F89]/40 backdrop-blur-md rounded-2xl shadow-xl border border-[#87F1FF]/40 flex flex-col overflow-hidden text-white">
        <div className="bg-[#2A4C57] text-[#87F1FF] p-6 flex items-center gap-4 border-b border-[#87F1FF]/30">
          <div className="w-12 h-12 bg-[#87F1FF] rounded-full flex items-center justify-center text-[#2A4C57] font-bold">
            S
          </div>
          <div>
            <h1 className="text-xl font-semibold">
              Stage 2: Marketing Strategy
            </h1>
            <p className="text-slate-300 text-sm">
              Professional Strategy Development
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-sm text-slate-300">Online</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4 hide-scrollbar ">
          {showDocument ? (
            isLoading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 border-4 border-[#87F1FF] border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-[#87F1FF] font-medium text-lg">
                  Generating your personalized strategy...
                </p>
                <p className="text-sm text-gray-300">
                  This may take up to 30–40 seconds for the best results.
                </p>
              </div>
            ) : (
              <div className="w-full max-w-5xl mx-auto">
                <div>
                  <h1 className="text-2xl font-semibold mb-4 text-[#87F1FF]">
                    Personalized Marketing Strategy
                  </h1>
                  <p className="text-sm text-gray-300 mb-6">
                    Generated for {user?.email ?? "your account"}
                  </p>
                  <div className="prose max-w-none text-white">
                    {displayedDoc.map((chunk, i) => (
                      <ReactMarkdown key={i}>{chunk}</ReactMarkdown>
                    ))}
                  </div>
                </div>
              </div>
            )
          ) : (
            <>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 shadow-sm rounded-2xl ${
                      message.type === "user"
                        ? "bg-[#87F1FF] text-[#2A4C57] rounded-br-md"
                        : "bg-[#537F89]/60 text-white rounded-bl-md"
                    }`}
                  >
                    <div className="text-sm leading-relaxed">
                      <ReactMarkdown>{message.content || ""}</ReactMarkdown>
                    </div>
                    <div
                      className={`text-xs mt-2 opacity-70 ${
                        message.type === "user"
                          ? "text-[#2A4C57]"
                          : "text-gray-300"
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#537F89]/50 rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#87F1FF] rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-[#87F1FF] rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-[#87F1FF] rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        {!showDocument && (
          <div className="border-t border-[#87F1FF]/30 p-4 bg-[#2A4C57]/80">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <textarea
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your answer here..."
                  className="w-full px-4 py-3 border border-[#87F1FF]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#87F1FF] bg-[#2A4C57] text-white resize-none"
                  rows={1}
                  disabled={isTyping}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!currentAnswer.trim() || isTyping}
                className="px-6 py-3 bg-[#87F1FF] text-[#2A4C57] rounded-xl hover:bg-white disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                Send
              </button>
              {isComplete && (
                <button
                  onClick={handleGenerateStrategy}
                  className="px-6 py-3 bg-[#98EBA5] text-[#2A4C57] rounded-xl hover:bg-[#b0f5b8] transition-colors"
                  disabled={isLoading}
                >
                  Generate Strategy
                </button>
              )}
            </div>
            <div className="mt-2 text-xs text-gray-300 text-center">
              Question {Math.min(currentQuestion + 1, AUDIT_QUESTIONS.length)}{" "}
              of {AUDIT_QUESTIONS.length} • Press Enter to send
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalChatbot;
