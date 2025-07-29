import { useState, useEffect } from 'react'
import { useForgotPasswordMutation } from '../../features/auth/authApi'
import { useNavigate, Link } from 'react-router-dom'
import FuturisticButton from '../../components/furastic-button'
import { H1, BodyText, Caption, H2 } from '../../components/ui/typography'
import { useToast } from '../../contexts/ToastContext'

export const ForgotPasswordPage = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()
  const navigate = useNavigate()
  const { showSuccess, showError } = useToast()
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
    
    try {
      await forgotPassword({ email }).unwrap()
      setIsEmailSent(true)
      setError('')
      showSuccess("Reset Link Sent!", "Check your email for password reset instructions")
    } catch (err: any) {
      const errorMessage = err?.data?.message || 'Failed to send reset link.'
      setError(errorMessage)
      setIsEmailSent(false)
      showError("Reset Failed", errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue via-dark-grey to-ui-dark relative overflow-hidden font">
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

    

      {/* Main Content */}
      <div className="relative z-30 flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
        <div className="w-full max-w-lg mx-auto">
          {/* Form Container */}
          <div className={`bg-ui-medium/50 backdrop-blur-sm border border-[#8ef0f4] rounded-2xl p-8 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Header */}
            <div className="text-center mb-2">
              <div className="w-16 h-16  from-primary to-cyber-blue rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <H2 className="text-white font-font mb-2">
                Forgot Password?
              </H2>
              <BodyText className="text-gray-300 font-font">
                {isEmailSent 
                  ? "Check your email for reset instructions"
                  : "Enter your email address and we'll send you a link to reset your password"
                }
              </BodyText>
              {/* <div className="w-16 h-1 bg-gradient-to-r from-primary via-cyber-blue to-neon-cyan mx-auto mt-2 rounded-full shadow-cyber"></div> */}
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
                    className={`w-full px-4 py-3 bg-ui-dark/50 border border-[#8ef0f4] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8ef0f4] focus:border-primary transition-all duration-300 ${
                      error ? 'border-red-500' : 'border-primary/20'
                    }`}
                    placeholder="Enter your email"
                  />
                  {error && (
                    <p className="mt-1 text-sm text-red-400">{error}</p>
                  )}
                </div>

                {/* Submit Button */}
                <FuturisticButton type='submit' className='ml-30'> {isSubmitting ? 'Sending...' : 'Send Reset Link'}</FuturisticButton>
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
                      <h3 className="text-lg font-semibold text-white">Email Sent!</h3>
                      <p className="text-sm text-gray-300">Check your inbox for reset instructions</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">
                    We've sent a password reset link to <span className="text-white font-medium">{email}</span>. 
                    Click the link in the email to reset your password.
                  </p>
                </div>



                <div className="space-y-3">
                  <div className='flex justify-center'>
                  <FuturisticButton onClick={() => setIsEmailSent(false)} type='submit'>{isSubmitting ? 'Resend Email' : 'Resending Email'}</FuturisticButton>
                  </div>

                  <button
                    onClick={() => navigate('/auth/login')}
                    className="w-full h-12 text-white font-bold font-cyber tracking-wide rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    <span>Back to Sign In</span>
                  </button>
                </div>
              </div>
            )}

            {/* Help Links */}
            <div className="text-center mt-8 space-y-2">
              <p className="text-gray-300 text-sm">
                Remember your password?{' '}
                <Link to="/auth/login" className="text-white hover:text-cyber-blue transition-colors duration-300 font-semibold">
                  Sign in here
                </Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 