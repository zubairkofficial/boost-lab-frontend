import React, { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useResendConfirmationEmailMutation } from "../../features/auth/authApi";
import { useToast } from "../../contexts/ToastContext";
import bg from "../../assets/bg_1_1.jpg";
import frame from "../../assets/vector2.png";

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showSuccess, showError } = useToast();
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);

  const [resendConfirmationEmail] = useResendConfirmationEmailMutation();

  useEffect(() => {
    setIsLoaded(true);
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleResendEmail = async () => {
    if (!email.trim()) {
      showError("Please enter your email address");
      return;
    }

    setIsResending(true);
    try {
      await resendConfirmationEmail({ email: email.trim() }).unwrap();
      showSuccess(
        "Email Sent!",
        "Confirmation email has been sent to your inbox"
      );
    } catch (err: any) {
      console.error("Failed to resend email:", err);
      const errorMessage =
        err?.data?.message ||
        "Failed to send confirmation email. Please try again.";
      showError("Email Failed", errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue via-dark-grey to-ui-dark relative overflow-hidden font">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-dark-blue/80 via-dark-grey/70 to-ui-dark/90" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-32 sm:w-48 h-32 sm:h-48 bg-[#8ef0f4]/30 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-40 sm:w-64 h-40 sm:h-64 bg-[#8ef0f4]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#8ef0f4]/20 rounded-full blur-2xl animate-float" />
        <div
          className="absolute top-1/3 right-1/3 w-20 h-20 bg-[#8ef0f4]/10 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
      </div>
      <div className="relative z-30 flex justify-center items-center min-h-screen px-4 sm:px-6 md:px-12 py-8 sm:py-16">
        <div
          className={`w-full max-w-lg bg-ui-medium/50 backdrop-blur-sm border border-[#8ef0f4] rounded-2xl p-6 sm:p-10 transition-all duration-1000 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-16 h-16 mx-auto mb-5 bg-[#8ef0f4]/20 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[#8ef0f4]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-cyber mb-3">
              Confirm Your Email
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">
              We've sent a confirmation email to your inbox. Please check it and
              click the link to activate your account.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-2.5 bg-ui-dark/50 border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8ef0f4] focus:border-primary transition-all duration-300"
                placeholder="Enter your email address"
              />
            </div>
            <div className="w-full mt-6 cursor-pointer group flex justify-center">
              <div
                className="w-full max-w-xs h-[90px] bg-no-repeat bg-center bg-contain flex items-center justify-center"
                style={{
                  backgroundImage: `url(${frame})`,
                  backgroundSize: "100% 100%",
                }}
              >
                <button
                  type="button"
                  onClick={handleResendEmail}
                  disabled={isResending}
                  className="text-white text-sm sm:text-base font-semibold px-4 py-2 
        transition-all duration-500 ease-out
        group-hover:shadow-[0_0_2500px_100px_#8EF0F4] 
        rounded-md 
        !bg-transparent 
        !hover:bg-transparent 
        !focus:bg-transparent 
        !active:bg-transparent 
        border-none outline-none"
                >
                  {isResending ? "Sending..." : "Resend Email"}
                </button>
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-300 text-sm mb-3">
              Already confirmed your email?
            </p>
            <Link
              to="/auth/login"
              className="inline-flex items-center text-[#8ef0f4] hover:text-white transition-colors duration-300 font-semibold text-sm"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
