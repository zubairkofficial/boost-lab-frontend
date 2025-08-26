import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import naturalLightImg from "../../assets/light01.png";
import uniqueLightImg from "../../assets/light2.png";

import iconImage from "../../assets/quiz.svg";

interface Question4Props {
  handleSelect: (choice: string) => void;
}

export default function Question4({ handleSelect }: Question4Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const question = "Which lighting do you prefer?";

  const choices = [
    { label: "Natural lighting", image: naturalLightImg },
    { label: "Creating unique lighting effects", image: uniqueLightImg },
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
      className="min-h-screen bg-[#063241] text-white flex flex-col py-10 w-full px-4 md:px-14"
    >
      <div className="flex items-center space-x-3 mb-6 w-full">
        <img src={iconImage} alt="Icon" className="w-8 h-8" />
        <h1 className="text-2xl font-semibold">Find Out Your Photo Identity</h1>
      </div>

      <div className="w-full bg-[#05454E] h-1.5 rounded-full mb-10">
        <div className="bg-[#62D4D8] h-1.5 w-[60%] rounded-full"></div>
      </div>

      <h2
        className="text-3xl font-normal mb-10 text-[#8EF0F4]"
        style={{ fontFamily: "'Unbounded', sans-serif" }}
      >
        {question}
      </h2>
      <div className="flex flex-col sm:flex-row w-[40%]">
        {choices.map(({ label, image }) => (
          <div
            key={label}
            onClick={() => handleChoiceClick(label)}
            className="cursor-pointer w-full sm:w-1/2"
          >
            <div
              className={`h-64 border-4 overflow-hidden transition-all duration-300 ${
                selected === label ? "border-[#62D4D8]" : "border-transparent"
              }`}
            >
              <img
                src={image}
                alt={label}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <div
              className={`mt-0 py-2 text-left font-medium transition ${
                selected === label ? "text-[#62D4D8]" : "text-white"
              }`}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-auto pt-8">
        <p className="text-gray-300">Step: 4/6</p>
        <div className="flex space-x-3">
          <button className="bg-[#35686B] p-3 rounded hover:bg-[#46898D] transition">
            <FiArrowLeft size={20} />
          </button>
          <button className="bg-[#62D4D8] p-3 rounded text-black hover:bg-[#4BC1C5] transition">
            <FiArrowRight size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
