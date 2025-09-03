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
  const navigate = useNavigate(); // ✅ for redirect
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus();
    }
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
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <Toaster position="top-right" />

      <div className="w-full max-w-4xl h-full bg-white flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Stage 2: Marketing Strategy
            </h1>
            <p className="text-sm text-gray-500">
              Professional Strategy Development
            </p>
          </div>

          {/* ✅ Cross button now navigates back */}
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className="group">
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">
                      {msg.sender === "user" ? "U" : "AI"}
                    </span>
                  </div>

                  {/* Message */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {msg.sender === "user" ? "You" : "Boostie"}
                    </div>

                    <div className="prose prose-gray max-w-none text-gray-800 leading-relaxed">
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
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">B</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      Assistant
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
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
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
                  rows={1}
                  disabled={loading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  style={{
                    minHeight: "48px",
                    maxHeight: "120px",
                  }}
                />

                <button
                  onClick={sendMessage}
                  className="absolute right-2 bottom-3 p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
