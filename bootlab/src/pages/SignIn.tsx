import { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'

export const SignInPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoaded, setIsLoaded] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      // Handle successful login
      navigate('/')
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen  bg-gradient-to-br from-dark-blue via-dark-grey to-ui-dark relative overflow-hidden">
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
        <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-neon-cyan/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-portal-orange/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }}></div>
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
            onClick={() => navigate('/')}
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
        <div className="w-full max-w-4xl mx-auto">
          {/* Success Message */}
          {location.state?.message && (
            <div className={`mb-6 bg-accent-green/20 border border-accent-green/30 rounded-lg p-4 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-accent-green font-medium">{location.state.message}</p>
              </div>
            </div>
          )}

          {/* Form Container */}
          <div className={`bg-ui-medium/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-12 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-cyber mb-4">
                Welcome Back to <span className="text-primary animate-glow">BoostLab</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-6">Sign in to continue your photography journey</p>
              <div className="w-24 h-2 bg-gradient-to-r from-primary via-cyber-blue to-neon-cyan mx-auto rounded-full shadow-cyber"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-200 mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-6 py-4 text-lg bg-ui-dark/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 ${
                    errors.email ? 'border-red-500' : 'border-primary/20'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-lg font-medium text-gray-200 mb-3">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-6 py-4 text-lg bg-ui-dark/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 ${
                    errors.password ? 'border-red-500' : 'border-primary/20'
                  }`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary bg-ui-dark border-primary/20 rounded focus:ring-primary/50 focus:ring-2"
                  />
                  <label htmlFor="rememberMe" className="text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                <Link 
                  to="/auth/forgot-password"
                  className="text-sm text-primary hover:text-cyber-blue transition-colors duration-300"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-16 bg-gradient-to-r from-primary to-cyber-blue text-white font-bold font-cyber tracking-wide rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-center space-x-3">
                  {isSubmitting && (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {!isSubmitting && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  )}
                  <span>{isSubmitting ? 'Signing In...' : 'Sign In'}</span>
                </div>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-ui-medium/50 text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <button
                className="w-full h-12  text-white font-bold font-cyber tracking-wide rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

            
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-8">
              <p className="text-gray-300">
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