import { useNavigate } from "react-router-dom";
import aiImage from "../../assets/boostlab.png";

const PhotoIdentity = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/test");
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-[#02303d] text-white">
      <div className="flex flex-col justify-center px-8 md:px-16 py-12 w-full md:w-1/2">
        <h1
          className="text-2xl md:text-5xl font-semibold text-[#8EF0F4] leading-tight"
          style={{ fontFamily: "'Unbounded', sans-serif" }}
        >
          FIND OUT YOUR PHOTO IDENTITY WITH AI TEST
        </h1>

        <p className="mt-6 text-xl md:text-lg text-gray-300 capitalize font-semibold">
          Take the test to find out your unique style and genre – the first step
          toward realizing your individuality in the world of photography. Start
          with 5 simple questions — it takes just 10 seconds to begin your
          creative journey.
        </p>

        <button
          onClick={handleStart}
          className="mt-8 w-fit bg-[#8EF0F4] text-black px-12 py-4 hover:bg-cyan-400 transition font-normal text-xl flex items-center gap-3"
        >
          Get started →
        </button>
      </div>

      <div className="hidden md:block w-full md:w-1/2">
        <img
          src={aiImage}
          alt="AI Robot"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default PhotoIdentity;
