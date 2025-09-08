"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import ReactMarkdown from "react-markdown";
import { Send, X } from "lucide-react";

interface ChatMessage {
  id?: number;
  sender: "user" | "bot";
  message: string;
  createdAt?: string;
}

export default function BoostieChat() {
  const user = useSelector((state: RootState) => state.user.user);
  const userLocal = localStorage.getItem("user");
  const userData = JSON.parse(userLocal ?? "{}");
  const email = user?.email || userData?.email;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRegenerate, setShowRegenerate] = useState(false);
  const [stage2Complete, setStage2Complete] = useState(false);

  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    if (!loading) inputRef.current?.focus();
  }, [loading]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (!email) return;
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/agent/chat/${email}`,
          { withCredentials: true }
        );
        setMessages(res.data.history || []);
      } catch (err: any) {
        toast.error("Failed to load chat history");
      }
    };
    fetchHistory();
  }, [email]);

  const sendMessage = async () => {
    if (!input.trim() || !email) {
      toast.error("Email not found. Please log in again.");
      return;
    }

    const userMessage: ChatMessage = {
      sender: "user",
      message: input,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // If Stage 2 is complete, check user input intent
    if (stage2Complete) {
      if (/^yes|move on|go ahead|proceed/i.test(input.trim())) {
        // User wants Stage 3 → go straight
        setShowRegenerate(false);
        navigate("/stage3");
      } else {
        // User wants to tweak → show regenerate button
        setShowRegenerate(true);
      }
    }

    setInput("");
    setLoading(true);
    inputRef.current?.focus();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/agent/strategy`,
        { email, audit_answers: [input] },
        { withCredentials: true }
      );

      const fullText = res.data.strategy;
      const chunkedText = fullText.split("\n\n").filter(Boolean);

      const botMessage: ChatMessage = {
        sender: "bot",
        message: "",
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);

      for (const chunk of chunkedText) {
        botMessage.message += chunk + "\n\n";
        setMessages((prev) => [...prev.slice(0, -1), botMessage]);
        await new Promise((resolve) => setTimeout(resolve, 150));
      }

      // Detect final Stage 2 completion prompt
      if (fullText.includes("Are you ready to move on to Stage 3")) {
        setStage2Complete(true);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const regenerateStrategy = async () => {
    if (!email) return;
    setLoading(true);
    setShowRegenerate(false);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/agent/strategy/regenerate`,
        { email },
        { withCredentials: true }
      );

      const fullText = res.data.strategy;
      const botMessage: ChatMessage = {
        sender: "bot",
        message: fullText,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      toast.error("Failed to regenerate strategy");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center text-white overflow-auto before:absolute before:inset-0 before:bg-[#2A4C57]/95 before:z-0"
      style={{
        backgroundImage:
          "url(https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Toaster position="top-right" />

      <div className="w-full max-w-4xl h-full flex flex-col relative z-10">
        <div className="flex items-center justify-between py-4 border-b border-[#87F1FF]/30 bg-[#2A4C57]/60 backdrop-blur-md">
          <div className="px-6">
            <h1 className="text-lg font-semibold text-white">
              Stage 2: Marketing Strategy
            </h1>
            <p className="text-sm text-white">
              Professional Strategy Development
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-6 h-6 text-[#87F1FF]" />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-scroll hide-scrollbar bg-transparent"
        >
          <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className="group">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#537F89]/70 flex items-center justify-center">
                    <span className="text-xs font-medium text-white">
                      {msg.sender === "user" ? "U" : "AI"}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#87F1FF] mb-1">
                      {msg.sender === "user" ? "You" : "Boostie"}
                    </div>

                    <div className="prose max-w-none text-white leading-relaxed">
                      {msg.sender === "user" ? (
                        <p className="whitespace-pre-wrap">{msg.message}</p>
                      ) : (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw, rehypeSanitize]}
                        >
                          {msg.message}
                        </ReactMarkdown>
                      )}
                    </div>

                    {msg.createdAt && (
                      <div className="text-xs text-gray-400 mt-2">
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="group">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#537F89]/70 flex items-center justify-center">
                    <span className="text-xs font-medium text-white">B</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#87F1FF] mb-1">
                      Boostie
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-[#98EBA5] rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-[#98EBA5] rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-[#98EBA5] rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className=" border-[#87F1FF]/30 bg-[#2A4C57]/60 backdrop-blur-md p-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 pr-12 border border-[#87F1FF]/40 rounded-xl bg-[#537F89]/30 focus:outline-none resize-none text-white placeholder-gray-300"
                  rows={1}
                  disabled={loading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  style={{ minHeight: "48px", maxHeight: "120px" }}
                />

                <button
                  onClick={sendMessage}
                  className="absolute right-2 bottom-3 p-2 bg-[#98EBA5] text-[#2A4C57] rounded-lg  disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={loading || !input.trim()}
                >
                  <Send className="w-4 h-4 text-center" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
