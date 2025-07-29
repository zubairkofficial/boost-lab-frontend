import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useResendConfirmationEmailMutation } from '../../features/auth/authApi';
import FuturisticButton from '../../components/furastic-button';
import { useToast } from '../../contexts/ToastContext';
import bg from '../../assets/bg_1_1.jpg';

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showSuccess, showError } = useToast();
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);

  const [resendConfirmationEmail] = useResendConfirmationEmailMutation();

  useEffect(() => {
    setIsLoaded(true);
    // Get email from URL params if available
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleResendEmail = async () => {
    if (!email.trim()) {
      showError('Please enter your email address');
      return;
    }

    setIsResending(true);
    try {
      await resendConfirmationEmail({ email: email.trim() }).unwrap();
      showSuccess('Email Sent!', 'Confirmation email has been sent to your inbox');
    } catch (err: any) {
      console.error('Failed to resend email:', err);
      const errorMessage = err?.data?.message || 'Failed to send confirmation email. Please try again.';
      showError('Email Failed', errorMessage);
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
        className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-dark-blue/80 via-dark-grey/70 to-ui-dark/90"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-[#8ef0f4]/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-[#8ef0f4]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#8ef0f4]/20 rounded-full blur-2xl animate-float"></div>
        <div
          className="absolute top-1/3 right-1/3 w-24 h-24 bg-[#8ef0f4]/10 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="relative z-30 flex justify-center items-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
        <div
          className={`bg-ui-medium/50 backdrop-blur-sm border border-[#8ef0f4] rounded-2xl p-8 min-h-[500px] min-w-[500px] flex flex-col justify-center transition-all duration-1000 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-[#8ef0f4]/20 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-[#8ef0f4]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white font-cyber mb-4">
              Confirm Your Email
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              We've sent a confirmation email to your inbox. Please check your email and click the confirmation link to activate your account.
            </p>
            <div className="bg-[#8ef0f4]/10 border border-[#8ef0f4]/30 rounded-lg p-4 mb-6">
              <p className="text-[#8ef0f4] text-sm">
                💡 <strong>Tip:</strong> Don't forget to check your spam folder if you don't see the email in your inbox.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Email Input for Resend */}
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
                className="w-full px-4 py-3 bg-ui-dark/50 border border-primary/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8ef0f4] focus:border-primary transition-all duration-300"
                placeholder="Enter your email address"
              />
            </div>

            {/* Resend Button */}
            <div className="flex justify-center">
              <FuturisticButton
                onClick={handleResendEmail}
                disabled={isResending || !email.trim()}
                className="w-full"
              >
                {isResending ? "Sending..." : "Resend Confirmation Email"}
              </FuturisticButton>
            </div>

            {/* Back to Login */}
            <div className="text-center">
              <p className="text-gray-300 mb-4">
                Already confirmed your email?
              </p>
              <Link
                to="/auth/login"
                className="inline-flex items-center text-[#8ef0f4] hover:text-white transition-colors duration-300 font-semibold"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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
    </div>
  );
};

export default ConfirmEmail;
