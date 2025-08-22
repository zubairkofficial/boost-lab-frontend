import { useState } from "react";
import { motion } from "framer-motion";
import iconImage from "../../assets/quiz.svg";
import bright from "../../assets/1.webp";
import pastel from "../../assets/2.webp";
import blackAndWhite from "../../assets/3.webp";
import deepAndRichTones from "../../assets/4.webp";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

interface Question2Props {
  handleSelect: (choice: string) => void;
}

export default function Question2({ handleSelect }: Question2Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const question = "Which colors do you prefer in photography?";

  const choices = [
    { label: "Bright", image: bright },
    { label: "Pastel", image: pastel },
    { label: "Black and White", image: blackAndWhite },
    { label: "Deep and rich tones", image: deepAndRichTones },
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
      className="min-h-screen bg-[#063241] text-white flex flex-col py-10 px-6 sm:px-8 md:px-12 lg:px-20 w-full container mx-auto"
    >
      <div className="flex items-center space-x-3 mb-6">
        <img src={iconImage} alt="Icon" className="w-8 h-8" />
        <h1 className="text-2xl font-semibold">Find Out Your Photo Identity</h1>
      </div>

      <div className="w-full bg-[#05454E] h-1.5 rounded-full mb-8">
        <div className="bg-[#62D4D8] h-1.5 w-[30%] rounded-full"></div>
      </div>

      <h2
        className="text-2xl md:text-3xl font-normal mb-10 text-[#8EF0F4]"
        style={{ fontFamily: "'Unbounded', sans-serif" }}
      >
        {question}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {choices.map(({ label, image }) => (
          <div
            key={label}
            onClick={() => handleChoiceClick(label)}
            className="cursor-pointer rounded-lg transition overflow-hidden group"
          >
            <div
              className={`rounded-lg border-4 transition overflow-hidden ${
                selected === label ? "border-[#62D4D8]" : "border-transparent"
              }`}
            >
              <img
                src={image}
                alt={label}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div
              className={`mt-2 py-2 text-start font-medium transition ${
                selected === label ? "text-[#62D4D8]" : "text-white"
              }`}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-auto pt-4">
        <p className="text-gray-300 text-sm sm:text-base">Step: 2/6</p>
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
