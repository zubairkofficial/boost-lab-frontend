import { Link, useSearchParams } from "react-router-dom";
import bg from "../../assets/bg_tariffs.jpg";
import { useEffect, useState } from "react";

export default function Success() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/plans/verify-payment/${sessionId}`
        );
        const data = await response.json();
        setIsPaymentSuccessful(data.isPaid);
      } catch (error) {
        console.error("Error verifying payment:", error);
        setIsPaymentSuccessful(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-fixed bg-cover bg-no-repeat flex items-center justify-center p-6"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="bg-[#154E62]/80 backdrop-blur-lg border border-cyan-400/30 shadow-2xl text-white px-10 py-12 rounded-xl text-center max-w-xl w-full">
          <div className="w-16 h-16 border-4 border-cyan-300 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h1 className="text-2xl font-bold text-cyan-300 mb-4">
            Verifying Payment...
          </h1>
          <p className="text-slate-200">
            Please wait while we confirm your payment.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-no-repeat flex items-center justify-center p-6"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-[#154E62]/80 backdrop-blur-lg border border-cyan-400/30 shadow-2xl text-white px-10 py-12 rounded-xl text-center max-w-xl w-full">
        {isPaymentSuccessful ? (
          <>
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300 mb-6">
              Payment Successful
            </h1>
            <p className="text-lg sm:text-xl text-slate-200 mb-8">
              Thank you! Your subscription is now active.
            </p>
            <Link
              to="/personal-account"
              className="bg-cyan-500 hover:bg-cyan-600 transition-colors px-8 py-3 text-white text-sm sm:text-base font-semibold rounded-lg shadow-md"
            >
              Go to Dashboard
            </Link>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-red-300 mb-6">
              Payment Failed
            </h1>
            <p className="text-lg sm:text-xl text-slate-200 mb-8">
              We couldn't verify your payment. Please try again or contact
              support.
            </p>
            <Link
              to="/plans"
              className="bg-red-500 hover:bg-red-600 transition-colors px-8 py-3 text-white text-sm sm:text-base font-semibold rounded-lg shadow-md"
            >
              Try Again
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
