import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useVerifyRegisterOtpMutation } from '../features/auth/authApi'
import FuturisticButton from '../components/furastic-button'

export const VerifyOtpPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { name, email, password } = location.state || {}
  const [isLoaded, setIsLoaded] = useState(false)
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [verifyRegisterOtp] = useVerifyRegisterOtpMutation()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value)
    if (error) setError('')
  }

  const validateOtp = () => {
    if (!otp.trim()) {
      setError('OTP is required')
      return false
    }
    if (!/^\d{4,6}$/.test(otp)) {
      setError('Please enter a valid OTP')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateOtp()) return

    setIsSubmitting(true)
    try {
      await verifyRegisterOtp({ name, email, password, otp }).unwrap()
      setIsVerified(true)
      setTimeout(() => {
        navigate('/auth/login')
      }, 1500)
    } catch (err: any) {
      setError(err?.data?.message || 'OTP verification failed.')
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

      {/* Main Content */}
      <div className="relative z-30 flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
        <div className="w-full max-w-lg mx-auto">
          {/* Form Container */}
          <div className={`bg-ui-medium/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Header */}
            <div className="text-center mb-2">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-cyber-blue rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12A4 4 0 118 12a4 4 0 018 0zM12 18v2m0-12V4m8 8h2m-18 0H2m14.24 7.76l1.42 1.42M4.34 4.34l1.42 1.42m0 12.48l-1.42 1.42M19.66 4.34l-1.42 1.42" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white font-cyber mb-2">
                Verify OTP
              </h1>
              <p className="text-gray-300">
                {isVerified 
                  ? "OTP verified successfully! Redirecting..."
                  : "Enter the OTP sent to your email to continue"
                }
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-primary via-cyber-blue to-neon-cyan mx-auto mt-2 rounded-full shadow-cyber"></div>
            </div>

            {!isVerified ? (
              /* OTP Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* OTP Field */}
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-200 mb-2">
                    One-Time Password
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={handleOtpChange}
                    className={`w-full px-4 py-3 bg-ui-dark/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8ef0f4] focus:border-primary transition-all duration-300 ${
                      error ? 'border-red-500' : 'border-primary/20'
                    }`}
                    placeholder="Enter your OTP"
                  />
                  {error && (
                    <p className="mt-1 text-sm text-red-400">{error}</p>
                  )}
                </div>

                {/* Submit Button */}
                <FuturisticButton type="submit" className='ml-35'> {isSubmitting ? 'Verifying...' : 'Verify OTP'}</FuturisticButton>
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
                      <h3 className="text-lg font-semibold text-gray-200">OTP Verified!</h3>
                    </div>
                  </div>
            
                </div>
              </div>
            )}

            {/* Help Links */}
            <div className="text-center mt-8 space-y-2">
              <p className="text-gray-300 text-sm">
                Entered wrong email?{' '}
                <Link to="/auth/signup" className="text-primary hover:text-cyber-blue transition-colors duration-300 font-semibold">
                  Try again
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
