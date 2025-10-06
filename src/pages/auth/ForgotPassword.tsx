import React, { useState, useEffect } from "react";
import { useForgotPasswordMutation } from "../../features/auth/authApi";
import { useNavigate, Link } from "react-router-dom";
import { H2, BodyText } from "../../components/ui/typography";
import { useToast } from "../../contexts/ToastContext";

const ForgotPasswordPage = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail()) return;

    setIsSubmitting(true);
    try {
      await forgotPassword({ email }).unwrap();
      setIsEmailSent(true);
      setError("");
      showSuccess(
        "Reset Link Sent!",
        "Check your email for password reset instructions"
      );
    } catch (err: any) {
      const errorMessage = err?.data?.message || "Failed to send reset link.";
      setError(errorMessage);
      setIsEmailSent(false);
      showError("Reset Failed", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue via-dark-grey to-ui-dark relative overflow-hidden font">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full"
        style={{
          backgroundImage:
            "url(https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-dark-blue/80 via-dark-grey/70 to-ui-dark/90"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-48 h-48 bg-[#8ef0f4]/30 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-10 right-10 w-64 h-64 bg-[#8ef0f4]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#8ef0f4]/20 rounded-full blur-2xl animate-float" />
        <div
          className="absolute top-1/3 right-1/3 w-24 h-24 bg-[#8ef0f4]/10 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="relative z-30 flex justify-center items-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-10">
        <div className="w-full max-w-lg mx-auto bg-ui-medium/50 backdrop-blur-sm border border-[#8ef0f4] rounded-2xl p-8 transition-all duration-1000 delay-500">
          <div className="text-center mb-6">
            <H2 className="text-white font-font mb-2">Forgot Password?</H2>
            <BodyText className="text-gray-300 font-font">
              {isEmailSent
                ? "Check your email for reset instructions"
                : "Enter your email address and we'll send you a reset link"}
            </BodyText>
          </div>

          {!isEmailSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full px-4 py-3 bg-ui-dark/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8ef0f4] transition-all duration-300 ${
                    error ? "border-red-500" : "border-[#8ef0f4]"
                  }`}
                  placeholder="Enter your email"
                />
                {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative group w-full h-12 bg-ui-dark text-white font-bold font-cyber tracking-wide rounded-xl border border-cyber-blue transition-all duration-300  overflow-hidden"
              >
                <div className="absolute inset-0  border-[#8ef0f4] rounded-xl transition-all duration-300 pointer-events-none"></div>
                <span className="relative z-10">
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </span>
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-accent-green/20 border border-accent-green/30 rounded-lg p-6">
                <p className="text-sm text-gray-300">
                  We've sent a reset link to{" "}
                  <span className="text-white font-medium">{email}</span>.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEmailSent(false)}
                className="relative group w-full h-12 bg-ui-dark text-white font-bold  tracking-wide rounded-xl border border-cyber-blue transition-all duration-300  overflow-hidden"
              >
                <div className="absolute inset-0 border-2 border-cyber-blue rounded-xl transition-all duration-300 pointer-events-none"></div>
                <span className="relative z-10">
                  {isSubmitting ? "Resending Email..." : "Resend Email"}
                </span>
              </button>
            </div>
          )}
          <div className="text-center mt-8">
            <p className="text-gray-300 text-sm">
              Remember your password?{" "}
              <Link
                to="/auth/login"
                className="text-white hover:text-cyber-blue transition-colors duration-300 font-semibold"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ForgotPasswordPage)
