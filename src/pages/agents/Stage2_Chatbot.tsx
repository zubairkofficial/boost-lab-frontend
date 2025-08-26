import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import ReactMarkdown from "react-markdown";
import toast, { Toaster } from "react-hot-toast";

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

const Stage02Chatbot = () => {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<string[]>(
    Array(AUDIT_QUESTIONS.length).fill("")
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resultChunks, setResultChunks] = useState<string[]>([]);
  const [displayedChunks, setDisplayedChunks] = useState<string[]>([]);
  const [introShown, setIntroShown] = useState(false);

  useEffect(() => {
    // Show intro message first
    setDisplayedChunks([
      "Hello! I'm here to guide you through the Stage 2 Marketing Audit. Let's start with a few questions.",
    ]);
    setIntroShown(true);
  }, []);

  const handleChange = (value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = value;
    setAnswers(updatedAnswers);
  };

  const handleNext = async () => {
    if (!answers[currentQuestion].trim()) {
      toast.error("Please provide an answer before continuing.");
      return;
    }
    if (currentQuestion < AUDIT_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!user?.email) {
      toast.error("User email not found. Please log in.");
      return;
    }

    setLoading(true);
    setResultChunks([]);
    setDisplayedChunks((prev) => [
      ...prev,
      "Generating your personalized strategy... This may take 30-40 seconds.",
    ]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/agent/strategy`,
        { email: user.email, audit_answers: answers },
        { withCredentials: true }
      );

      const chunks = (response.data?.strategy || "No strategy returned.")
        .split("\n")
        .filter(Boolean);

      setResultChunks(chunks);
    } catch (error) {
      console.error("Error submitting answers:", error);
      setResultChunks(["Error submitting answers. Please try again."]);
      toast.error("Failed to generate strategy.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resultChunks.length === 0) return;
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedChunks((prev) => [...prev, resultChunks[index]]);
      index++;
      if (index >= resultChunks.length) clearInterval(interval);
    }, 400);
    return () => clearInterval(interval);
  }, [resultChunks]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage:
          'url("https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg")',
      }}
    >
      <Toaster position="top-right" />
      <div className="w-full max-w-3xl p-6 rounded-xl shadow-2xl bg-white/30 backdrop-blur-md border border-white/30 flex flex-col gap-6 overflow-hidden">
        <h1 className="text-3xl font-bold text-center text-white mb-4">
          Stage 2 Marketing Audit
        </h1>

        <div className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] p-2">
          {displayedChunks.map((chunk, i) => (
            <ReactMarkdown key={i}>{chunk}</ReactMarkdown>
          ))}

          {introShown && currentQuestion < AUDIT_QUESTIONS.length && (
            <div className="flex flex-col gap-2 mt-2">
              <div className="bg-blue-600 text-white p-3 rounded-lg w-fit max-w-[80%]">
                {AUDIT_QUESTIONS[currentQuestion]}
              </div>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                value={answers[currentQuestion]}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Type your answer and press Enter..."
                onKeyDown={(e) => e.key === "Enter" && handleNext()}
                disabled={loading}
              />
            </div>
          )}
        </div>

        <button
          onClick={handleNext}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 flex items-center justify-center mt-2"
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3-3 3h4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8h4l-3-3 3-3H4z"
              />
            </svg>
          ) : currentQuestion < AUDIT_QUESTIONS.length - 1 ? (
            "Next"
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
};

export default Stage02Chatbot;
