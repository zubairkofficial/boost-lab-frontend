import { Link } from "react-router-dom";

const NotFound = () => {
  const backgroundImage =
    "https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg";

  return (
   <>
    <div
      className="flex flex-col items-center justify-center min-h-screen text-center px-6 text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        fontFamily: `'Unbounded', Arial, sans-serif`,
      }}
    >
      <div className="bg-[#1f3b47]/10 backdrop-blur-md rounded-2xl px-8 py-10 max-w-xl w-full shadow-xl">
        <h1 className="text-8xl font-bold text-[#87F1FF] mb-4">404</h1>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-3">
          Page Not Found
        </h2>
        <p className="text-[#D1DDE3] mb-8 text-base sm:text-lg">
          Oops! This page doesn't exist.
        </p>
        <Link
          to="/"
          className="px-6 py-3 text-lg font-medium text-[#1F3B47] bg-[#87F1FF] rounded-lg shadow-md hover:bg-[#6EDDE5] transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
   </>
  );
};

export default NotFound;
