import { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import Button from '../components/Button'
import FuturisticButton from '../components/furastic-button'
import { useLoginMutation } from '../features/auth/authApi'

export const SignInPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoaded, setIsLoaded] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
    const [login, { isLoading, error, isSuccess }] = useLoginMutation()
  

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


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await login({
        // name: formData.Name,
        email: formData.email,
        password: formData.password,
      }).unwrap()
      navigate('/', { state: { message: 'login successfully!' } })
    } catch (err) {
      // error handled below
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

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
          <div className={`bg-ui-medium/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white font-cyber mb-4">
                Welcome Back to <span className="text-primary animate-glow">BoostLab</span>
              </h1>
              <p className="text-xl  text-gray-300 mb-6">Sign in to continue your photography journey</p>
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
                  className={`w-full px-6 py-4 text-lg bg-ui-dark/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8ef0f4] focus:border-primary transition-all duration-300 ${errors.email ? 'border-red-500' : 'border-primary/20'
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
                  className={`w-full px-6 py-4 text-lg bg-ui-dark/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8ef0f4] focus:border-primary transition-all duration-300 ${errors.password ? 'border-red-500' : 'border-primary/20'
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
                  className="text-sm text-gray-200 hover:text-cyber-blue transition-colors duration-300"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}

              {/* Error Message */}
                {error && (
                  <div className="mb-4 text-red-400 text-center text-sm">{(error as any)?.data?.message || 'Signup failed. Please try again.'}</div>
                )}
                {/* Success Message */}
                {isSuccess && (
                  <div className="mb-4 text-green-400 text-center text-sm">Signup successful!</div>
                )}
              {/* <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isSubmitting}
                className="w-full text-white"
                disabled={isSubmitting}
              >
                Sign In
              </Button> */}

              <FuturisticButton type='submit' className='ml-30'>Sign In</FuturisticButton>



            </form>

            {/* Divider
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-ui-medium/50 text-gray-400">Or continue with</span>
              </div>
            </div> */}


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