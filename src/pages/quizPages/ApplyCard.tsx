import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface ApplyCardProps {
  answers: string[];
  questions: { question: string; choices: string[] }[];
}

const ApplyCard: React.FC<ApplyCardProps> = ({ answers, questions }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = () => {
    console.log("User Info:", user || "No user logged in");
    console.log("Answers:", answers);

    if (user?.subscription?.status === "active") {
      navigate("/personal-account");
    } else {
      navigate("/personal-account-free");
    }
  };

  return (
    <div className="bg-[#154E62]/80 text-white p-8 rounded-xl shadow-2xl max-w-lg w-full">
      <h2 className="text-2xl font-bold mb-4">Review Your Answers</h2>
      <div className="mb-6">
        {questions.map((q, index) => (
          <div key={index} className="mb-2">
            <p className="font-semibold">{q.question}</p>
            <p className="ml-4 text-cyan-200">
              {answers[index] || "No answer provided"}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded font-semibold"
      >
        Submit
      </button>
    </div>
  );
};

export default ApplyCard;
