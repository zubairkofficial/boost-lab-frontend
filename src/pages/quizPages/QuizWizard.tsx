import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Question1 from "./Question1";
import Question2 from "./Question2";
import Question3 from "./Question3";
import Question4 from "./Question4";
import Question5 from "./Question5";
import SignupCard from "./SignupCard";

export default function QuizWizard() {
  const navigate = useNavigate();

  const questions = [
    {
      question: "Which photography style do you love the most?",
      choices: [
        "Classic",
        "Minimalism",
        "Contemporary",
        "Street",
        "Documentary",
      ],
    },
    {
      question: "Which colors do you prefer in photography?",
      choices: ["Bright", "Pastel", "Black & White", "Deep Tones", "Muted"],
    },
    {
      question: "Which subject would you prefer to photograph?",
      choices: ["Nature", "People", "Architecture", "Objects", "Fashion"],
    },
    {
      question: "Which lighting do you prefer?",
      choices: ["Natural", "Studio", "Ambient", "Hard", "Soft"],
    },
    {
      question: "Are you interested in technical aspects?",
      choices: [
        "Yes, very",
        "Somewhat",
        "No, emotional",
        "Depends on project",
        "Occasionally",
      ],
    },
  ];

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState(Array(5).fill(""));
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSelect = (choice: string) => {
    const updated = [...answers];
    updated[step - 1] = choice;
    setAnswers(updated);

    if (step < 5) setStep(step + 1);
    else setStep(6);
  };

  return (
    <motion.div className="min-h-screen flex items-center justify-center bg-[#04323A]">
      <Toaster position="top-right" />
      <AnimatePresence mode="wait">
        {step === 1 && <Question1 handleSelect={handleSelect} />}
        {step === 2 && <Question2 handleSelect={handleSelect} />}
        {step === 3 && <Question3 handleSelect={handleSelect} />}
        {step === 4 && <Question4 handleSelect={handleSelect} />}
        {step === 5 && <Question5 handleSelect={handleSelect} />}
        {step === 6 && (
          <SignupCard
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            answers={answers}
            questions={questions}
            navigate={navigate}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
