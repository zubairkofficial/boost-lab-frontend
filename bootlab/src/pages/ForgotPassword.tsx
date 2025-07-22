import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error) setError('')
  }

  const validateEmail = () => {
    if (!email.trim()) {
      setError('Email is required')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateEmail()) return

    setIsSubmitting(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsEmailSent(true)
    } catch (error) {
      console.error('Password reset error:', error)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue via-dark-grey to-ui-dark relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full"
        style={{
          backgroundImage: 'url(https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-blue/80 via-dark-grey/70 to-ui-dark/90"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-[#8ef0f4]/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-[#8ef0f4]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#8ef0f4]/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-[#8ef0f4]/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center p-6 md:p-8">
        {/* Logo */}
        <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-cyber-blue rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white font-cyber">BoostLab</span>
          </Link>
        </div>

        {/* Back Button */}
        <div className={`transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <button
            onClick={() => navigate('/auth/login')}
            className="px-6 py-3 bg-transparent border border-primary/20 text-primary hover:bg-primary/10 rounded-lg transition-all duration-300 font-cyber tracking-wide"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back</span>
            </div>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-30 flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
        <div className="w-full max-w-lg mx-auto">
          {/* Form Container */}
          <div className={`bg-ui-medium/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-cyber-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white font-cyber mb-2">
                Forgot Password?
              </h1>
              <p className="text-gray-300">
                {isEmailSent 
                  ? "Check your email for reset instructions"
                  : "Enter your email address and we'll send you a link to reset your password"
                }
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-primary via-cyber-blue to-neon-cyan mx-auto mt-4 rounded-full shadow-cyber"></div>
            </div>

            {!isEmailSent ? (
              /* Reset Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`w-full px-4 py-3 bg-ui-dark/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8ef0f4] focus:border-primary transition-all duration-300 ${
                      error ? 'border-red-500' : 'border-primary/20'
                    }`}
                    placeholder="Enter your email"
                  />
                  {error && (
                    <p className="mt-1 text-sm text-red-400">{error}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#8ef0f4] focus:ring-offset-2 bg-[#8ef0f4] text-black hover:bg-[#6edbe0] disabled:opacity-60 disabled:cursor-not-allowed ${isSubmitting ? 'animate-pulse' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            ) : (
              /* Success State */
              <div className="space-y-6">
                <div className="bg-accent-green/20 border border-accent-green/30 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-accent-green rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-accent-green">Email Sent!</h3>
                      <p className="text-sm text-gray-300">Check your inbox for reset instructions</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">
                    We've sent a password reset link to <span className="text-primary font-medium">{email}</span>. 
                    Click the link in the email to reset your password.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setIsEmailSent(false)}
                    className="w-full h-12 bg-white text-gray-800 font-bold font-cyber tracking-wide rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Resend Email</span>
                  </button>

                  <button
                    onClick={() => navigate('/auth/login')}
                    className="w-full h-12 bg-gradient-to-r from-primary to-cyber-blue text-black font-bold font-cyber tracking-wide rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Back to Sign In</span>
                  </button>
                </div>
              </div>
            )}

            {/* Help Links */}
            <div className="text-center mt-8 space-y-2">
              <p className="text-gray-300 text-sm">
                Remember your password?{' '}
                <Link to="/auth/login" className="text-primary hover:text-cyber-blue transition-colors duration-300 font-semibold">
                  Sign in here
                </Link>
              </p>
              <p className="text-gray-300 text-sm">
                Don't have an account?{' '}
                <Link to="/auth/signup" className="text-primary hover:text-cyber-blue transition-colors duration-300 font-semibold">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 