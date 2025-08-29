"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";

interface ChatMessage {
  role: "user" | "bot";
  content: string;
  timestamp: string;
}

export default function BoostieChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      content:
        "Hi! I’m Boostie — your personal AI mentor and strategy assistant. I’ll guide you through your marketing strategy.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, strategy]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/agent/strategy`,
        {
          email: "sadammuneer390@gmail.com",
          user_message: input,
        },
        { withCredentials: true }
      );

      const botMessage: ChatMessage = {
        role: "bot",
        content: res.data.strategy,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const generateStrategy = async () => {
    setIsGenerating(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/agent/strategy`,
        { email: "sadammuneer390@gmail.com" },
        { withCredentials: true }
      );
      setStrategy(res.data.strategy);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Error generating strategy"
      );
    } finally {
      setIsGenerating(false);
    }
  };

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
        fontFamily: `'PT Sans', sans-serif`,
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
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-4 hide-scrollbar"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[90%] px-4 py-3 shadow-sm rounded-2xl ${
                  msg.role === "user"
                    ? "bg-[#87F1FF] text-[#2A4C57] rounded-br-md"
                    : "bg-[#537F89]/60 text-white rounded-bl-md"
                }`}
              >
                <div className="text-sm leading-relaxed">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                <div
                  className={`text-xs mt-2 opacity-70 ${
                    msg.role === "user" ? "text-[#2A4C57]" : "text-gray-300"
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {strategy && (
            <div className="mt-4 p-4 bg-[#537F89]/50 rounded-2xl shadow">
              <h2 className="font-bold mb-2 text-[#87F1FF]">
                Generated Strategy:
              </h2>
              <ReactMarkdown>{strategy}</ReactMarkdown>
            </div>
          )}
        </div>
        <div className="border-t border-[#87F1FF]/30 p-7 bg-[#2A4C57]/80">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 px-4 py-3 border border-[#87F1FF]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#87F1FF] bg-[#2A4C57] text-white resize-none"
              rows={2}
              disabled={loading || isGenerating}
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
              disabled={loading || isGenerating}
            >
              Send
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
