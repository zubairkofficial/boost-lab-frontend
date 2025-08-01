import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import FuturisticButton from '../../components/FurasticButton'
import { useResetPasswordMutation } from '../../features/auth/authApi'

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [resetPassword] = useResetPasswordMutation();

  // Extract token from URL
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token') || '';

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const validatePasswords = (): boolean => {
    if (!newPassword || !confirmPassword) {
      setError('Please fill out both fields');
      return false;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePasswords()) return;
    setIsSubmitting(true);
    setError('');
    try {
      const res: any = await resetPassword({ token, newPassword }).unwrap();
      if (res && res.message) {
        setIsSuccess(true);
      } else {
        setError('Unexpected response from server.');
      }
    } catch (err: any) {
      setError(err?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue via-dark-grey to-ui-dark relative overflow-hidden font">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg)',
        }}
      />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-blue/80 via-dark-grey/70 to-ui-dark/90"></div>

      {/* Animated glowing circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-[#8ef0f4]/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-[#8ef0f4]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#8ef0f4]/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-[#8ef0f4]/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-30 flex flex-col justify-center items-center min-h-screen px-4 py-12">
        <div className={`w-full max-w-lg mx-auto bg-ui-medium/50 backdrop-blur-sm border border-[#8ef0f4] rounded-2xl p-8 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white font-cyber mb-2">
              Reset Password
            </h1>
            <p className="text-gray-300 text-sm">
              Enter and confirm your new password below.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-primary via-cyber-blue to-neon-cyan mx-auto mt-2 rounded-full shadow-cyber"></div>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password Field */}
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-200 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full px-4 py-3 bg-ui-dark/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8ef0f4] transition-all duration-300 ${
                    error ? 'border-red-500' : 'border-primary/20'
                  }`}
                  placeholder="Enter new password"
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-200 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-3 bg-ui-dark/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8ef0f4] transition-all duration-300 ${
                    error ? 'border-red-500' : 'border-primary/20'
                  }`}
                  placeholder="Confirm new password"
                />
                {error && (
                  <p className="mt-1 text-sm text-red-400">{error}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className='flex justify-center'>
              <FuturisticButton type="submit">
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </FuturisticButton>
              </div>
            </form>
          ) : (
            <div className="bg-gray-200/20 border border-gray-200/30 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Password Reset Successful!</h3>
              <p className="text-sm text-gray-300 mb-4">You can now log in with your new password.</p>
              <FuturisticButton onClick={() => navigate('/auth/login')}>
                Back to Login
              </FuturisticButton>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
