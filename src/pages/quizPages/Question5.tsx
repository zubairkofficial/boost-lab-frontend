import { useState } from "react";
import { motion } from "framer-motion";
import iconImage from "../../assets/quiz.svg";

export default function Question5({
  handleSelect,
}: {
  handleSelect: (choice: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const question =
    "Are you interested in the technical aspects of photography?";
  const choices = [
    "Yes, I am passionate about technical details.",
    "No, I am more interested in the emotional aspect.",
  ];

  const cardVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const handleChoiceClick = (choice: string) => {
    setSelected(choice);
    handleSelect(choice);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#04323A] text-white flex flex-col p-6 lg:p-20 w-full"
    >
      <div className="flex items-center space-x-3 mb-6">
        <img src={iconImage} alt="Icon" className="w-8 h-8" />
        <h1 className="text-2xl font-semibold">Find Out Your Photo Identity</h1>
      </div>
      <div className="w-full bg-[#05454E] h-1.5 rounded-full mb-10">
        <div className="bg-[#62D4D8] h-1.5 w-[80%] rounded-full"></div>
      </div>
      <h2 className="text-2xl font-semibold mb-8">{question}</h2>

      <div className="flex flex-col sm:flex-row sm:items-stretch sm:space-y-0 space-y-4 sm:gap-x-4">
        {choices.map((choice) => (
          <label
            key={choice}
            onClick={() => handleChoiceClick(choice)}
            className={`flex items-center sm:flex-1 gap-3 p-2 md:p-4 cursor-pointer transition ${
              selected === choice
                ? "bg-[#62D4D8] text-black"
                : "bg-[#35686B] hover:bg-[#46898D]"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selected === choice ? "border-black bg-black" : "border-white"
              }`}
            >
              {selected === choice && (
                <span className="w-2 h-2 rounded-full bg-white"></span>
              )}
            </span>
            {choice}
          </label>
        ))}
      </div>
    </motion.div>
  );
}
