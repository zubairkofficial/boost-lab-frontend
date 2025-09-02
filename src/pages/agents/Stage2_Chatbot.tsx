"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import ReactMarkdown from "react-markdown";

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

  const scrollRef = useRef<HTMLDivElement>(null);

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

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/agent/strategy`,
        { email, audit_answers: [input] },
        { withCredentials: true }
      );

      const fullText = res.data.strategy;
      const chunkedText = fullText.split("\n\n").filter(Boolean);

      // Start with an empty bot message
      const botMessage: ChatMessage = {
        sender: "bot",
        message: "",
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // Update the single bot message progressively
      for (const chunk of chunkedText) {
        botMessage.message += chunk + "\n\n";
        setMessages((prev) => [
          ...prev.slice(0, -1),
          botMessage, // replace the last message with updated text
        ]);

        // Optional delay for chunk effect
        await new Promise((resolve) => setTimeout(resolve, 150));
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#2A4C57] h-[95vh] relative overflow-auto before:absolute before:inset-0 before:bg-[#2A4C57]/60 before:z-0 flex items-center justify-center p-4"
      style={{
        backgroundImage:
          "url(https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        fontFamily: `'PT Sans', sans-serif`,
      }}
    >
      <Toaster position="top-right" />
      <div className="relative z-10 w-full max-w-6xl h-[100%] bg-[#537F89]/40 backdrop-blur-md rounded-2xl shadow-xl border border-[#87F1FF]/40 flex flex-col overflow-hidden text-white">
        {/* Header */}
        <div className="bg-[#2A4C57] text-[#87F1FF] p-6 flex items-center gap-4 border-b border-[#87F1FF]/30">
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

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] px-5 py-4 shadow-sm rounded-2xl ${
                  msg.sender === "user"
                    ? " bg-[#87F1FF] text-[#2A4C57] rounded-br-md"
                    : " bg-[#4A747F] text-[#fff] rounded-bl-md"
                }`}
              >
                <div className="text-sm leading-relaxed prose prose-invert max-w-none">
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      components={{
                        // Paragraph
                        p: ({ node, ...props }) => (
                          <p
                            className="m-0 mb-2 leading-relaxed text-sm"
                            {...props}
                          />
                        ),

                        h1: ({ node, ...props }) => (
                          <h1 className="text-lg font-bold" {...props} />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2
                            className="text-md text-lg font-semibold mb-2"
                            {...props}
                          />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3
                            className="text-sm font-semibold mb-1"
                            {...props}
                          />
                        ),

                        // Lists
                        ul: ({ node, ...props }) => (
                          <ul
                            className="list-disc list-inside mb-2 pl-4"
                            {...props}
                          />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol className="list-decimal mb-2 pl-4" {...props} />
                        ),
                        li: ({ node, ...props }) => (
                          <li
                            className="mb-1 text-sm"
                            {...props}
                          />
                        ),
                        // Inline code & code blocks
                        code: ({ node, inline, className, ...props }: any) => (
                          <code
                            className={`${
                              inline
                                ? "bg-[#2A4C57]/50 px-1 py-0.5 rounded text-sm font-mono"
                                : "bg-[#2A4C57]/30 p-2 rounded block overflow-auto text-sm font-mono"
                            } ${className || ""}`}
                            {...props}
                          />
                        ),
                        pre: ({ node, ...props }) => (
                          <pre
                            className="bg-[#2A4C57]/30 p-3 rounded overflow-auto mb-2"
                            {...props}
                          />
                        ),
                        blockquote: ({ node, ...props }) => (
                          <blockquote
                            className="border-l-4 border-[#87F1FF] pl-4 italic text-gray-200 mb-2"
                            {...props}
                          />
                        ),
                        a: ({ node, ...props }) => (
                          <a
                            className="text-[#87F1FF] underline hover:text-white"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {msg.message}
                    </ReactMarkdown>
                  </div>
                </div>
                {msg.createdAt && (
                  <div
                    className={`text-xs mt-2 opacity-70 ${
                      msg.sender === "user" ? "text-[#2A4C57]" : "text-gray-400"
                    }`}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-[#87F1FF]/30 p-6 bg-[#2A4C57]/80">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 px-4 py-3 border border-[#87F1FF]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#87F1FF] bg-[#2A4C57] text-white resize-none"
              rows={2}
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button
              onClick={sendMessage}
              className="px-6 py-6 bg-[#87F1FF] text-[#2A4C57] rounded-xl hover:bg-white disabled:opacity-50 transition-colors"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
