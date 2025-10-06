import { useState } from "react";
import { motion } from "framer-motion";
import iconImage from "../../assets/quiz.svg";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

interface Question1Props {
  handleSelect: (choice: string) => void;
}

export default function Question1({ handleSelect }: Question1Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const question = "Which photography style resonates with you the most?";
  const choices = ["Classic", "Minimalism", "Contemporary Art"];

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
      className="min-h-screen bg-[#063241] text-white flex flex-col w-full py-10 px-6 sm:px-8 md:px-12 lg:px-20 container mx-auto"
    >
      <div className="flex items-center space-x-3 mb-6">
        <img src={iconImage} alt="Icon" className="w-8 h-8" />
        <h1 className="text-2xl font-semibold">Find Out Your Photo Identity</h1>
      </div>

      <div className="w-full bg-[#05454E] h-1.5 rounded-full mb-8">
        <div className="bg-[#62D4D8] h-1.5 w-[15%] rounded-full"></div>
      </div>

      <div className="flex-1 flex flex-col">
        <h2
          className="text-xl md:text-3xl font-normal mb-8 text-[#8EF0F4]"
          style={{ fontFamily: "'Unbounded', sans-serif" }}
        >
          {question}
        </h2>

        <div className="space-y-4">
          {choices.map((choice) => (
            <label
              key={choice}
              onClick={() => handleChoiceClick(choice)}
              className={`flex items-center gap-4 sm:gap-6 p-4 cursor-pointer transition ${
                selected === choice ? "bg-[#46898D] text-black" : "bg-[#35686B]"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selected === choice
                    ? "border-cyan-400 bg-cyan-300"
                    : "border-white"
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

        <div className="flex justify-between items-center mt-auto pt-8">
          <p className="text-gray-300 text-sm sm:text-base">Step: 1/6</p>
          <div className="flex space-x-3">
            <button className="bg-[#35686B] p-3 rounded hover:bg-[#46898D] transition w-12 h-12 flex items-center justify-center">
              <FiArrowLeft size={20} />
            </button>
            <button className="bg-[#62D4D8] p-3 rounded text-black hover:bg-[#4BC1C5] transition w-12 h-12 flex items-center justify-center">
              <FiArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
