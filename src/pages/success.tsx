import { Link } from "react-router-dom";
import bg from "../assets/bg_tariffs.jpg";

export default function Success() {
  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-no-repeat flex items-center justify-center p-6"
      style={{ backgroundImage: `url(${bg})` }}
    >c
      <div className="bg-[#154E62]/80 backdrop-blur-lg border border-cyan-400/30 shadow-2xl text-white px-10 py-12 rounded-xl text-center max-w-xl w-full">
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300 mb-6">
          Payment Successful
        </h1>
        <p className="text-lg sm:text-xl text-slate-200 mb-8">
          Thank you! Your subscription is now active.
        </p>
        <Link
          to="/after-subscription"
          className="bg-cyan-500 hover:bg-cyan-600 transition-colors px-8 py-3 text-white text-sm sm:text-base font-semibold rounded-lg shadow-md"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
