import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import sideImage from "../../assets/questionPage3Image.png";
import iconImage from "../../assets/quiz.svg";
interface Question3Props {
  handleSelect: (choice: string) => void;
}

export default function Question3({ handleSelect }: Question3Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const question = "Which subject would you prefer to photograph?";
  const choices = [
    "Nature",
    "People",
    "Architecture",
    "Objects",
    "Fashion & Style",
    "Food & Still Life",
    "Animals",
    "Urban Life",
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
      className="min-h-screen bg-[#063241] text-white flex flex-col w-full container mx-auto"
    >
      <div className="flex items-center space-x-3 px-6 sm:px-10 md:px-14 lg:px-20 pt-10 mb-4">
        <div className="flex items-center space-x-3 mb-6">
          <img src={iconImage} alt="Icon" className="w-8 h-8" />
          <h1 className="text-2xl font-semibold">
            Find Out Your Photo Identity
          </h1>
        </div>
      </div>
      <div className="px-6 sm:px-10 md:px-14 lg:px-20 mb-8">
        <div className="w-full bg-[#05454E] h-1.5 rounded-full">
          <div className="bg-[#62D4D8] h-1.5 w-[45%] rounded-full"></div>
        </div>
      </div>
      <h2
        className="text-xl md:text-3xl font-semibold mb-5 lg:mb-10 text-[#8EF0F4] px-6 lg:px-20"
        style={{ fontFamily: "'Unbounded', sans-serif" }}
      >
        {question}
      </h2>

      <div className="flex flex-col lg:flex-row px-6 sm:px-10 md:px-14 lg:px-20 gap-8 flex-1 pb-10">
        <div className="flex-1 flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {choices.map((choice) => (
              <label
                key={choice}
                onClick={() => handleChoiceClick(choice)}
                className={`flex items-center gap-3 p-4  cursor-pointer transition ${
                  selected === choice
                    ? "bg-[#62D4D8] text-black"
                    : "bg-[#35686B] hover:bg-[#46898D]"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selected === choice
                      ? "border-black bg-black"
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
        </div>
        <div className="hidden lg:flex w-[45%]">
          <img
            src={sideImage}
            alt="Photography Subject"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-auto py-0 mb-10 px-6 lg:px-20">
        <p className="text-gray-300 text-sm sm:text-base">Step: 3/6</p>
        <div className="flex space-x-3">
          <button className="bg-[#35686B] p-3 rounded hover:bg-[#46898D] transition w-12 h-12 flex items-center justify-center">
            <FiArrowLeft size={20} />
          </button>
          <button className="bg-[#62D4D8] p-3 rounded text-black hover:bg-[#4BC1C5] transition w-12 h-12 flex items-center justify-center">
            <FiArrowRight size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
