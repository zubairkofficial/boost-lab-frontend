// ✅ Fully updated SignUpPage with backend API integration for Stripe + Supabase
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignupMutation } from '../features/auth/authApi';
import FuturisticButton from '../components/furastic-button';
import { useToast } from '../contexts/ToastContext';
import bg from '../assets/bg_1_1.jpg';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    planId: '' // optional planId field
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [signup, { isLoading, error, isSuccess }] = useSignupMutation();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.Name.trim()) newErrors.Name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await signup({
        name: formData.Name,
        email: formData.email,
        password: formData.password,
      }).unwrap();
      showSuccess("Account Created!", "Please sign in with your new account");
      navigate('/auth/login', { replace: true });
    } catch (err: any) {
      console.error('Signup failed:', err);
      showError("Signup Failed", (err as any)?.data?.message || "Please try again with different credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue via-dark-grey to-ui-dark relative overflow-hidden font">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0 bg-gradient-to-br from-dark-blue/80 via-dark-grey/70 to-ui-dark/90"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-[#8ef0f4]/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-[#8ef0f4]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#8ef0f4]/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-[#8ef0f4]/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-30 flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
        <div className="w-full max-w-lg mx-auto">
          <div className={`bg-ui-medium/50 backdrop-blur-sm border border-[#8ef0f4] rounded-2xl p-8 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white font-cyber mb-2">
                Join <span className="text-white animate-glow">BoostLab</span>
              </h1>
              <p className="text-gray-300">Create your account and start your photography journey</p>
              <div className="w-16 h-1 bg-gradient-to-r from-primary via-cyber-blue to-neon-cyan mx-auto mt-4 rounded-full shadow-cyber"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="Name" className="block text-sm font-medium text-gray-200 mb-2">Name</label>
                <input type="text" id="Name" name="Name" value={formData.Name} onChange={handleInputChange} className={`w-full px-4 py-3 bg-ui-dark/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8ef0f4] focus:border-primary transition-all duration-300 ${errors.Name ? 'border-red-500' : 'border-primary/20'}`} placeholder="Enter your name" />
                {errors.Name && <p className="mt-1 text-sm text-red-400">{errors.Name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full px-4 py-3 bg-ui-dark/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8ef0f4] focus:border-primary transition-all duration-300 ${errors.email ? 'border-red-500' : 'border-primary/20'}`} placeholder="Enter your email" />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} className={`w-full px-4 py-3 bg-ui-dark/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8ef0f4] focus:border-primary transition-all duration-300 ${errors.password ? 'border-red-500' : 'border-primary/20'}`} placeholder="Create a password" />
                {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-2">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className={`w-full px-4 py-3 bg-ui-dark/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8ef0f4] focus:border-primary transition-all duration-300 ${errors.confirmPassword ? 'border-red-500' : 'border-primary/20'}`} placeholder="Confirm your password" />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
              </div>

              <div className="flex items-start space-x-3">
                <input type="checkbox" id="agreeToTerms" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleInputChange} className="mt-1 w-4 h-4 text-white bg-ui-dark border-primary/20 rounded focus:ring-primary/50 focus:ring-2" />
                <div className="flex-1">
                  <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
                    I agree to the{' '}
                    <a href="#" className="text-white hover:text-cyber-blue transition-colors duration-300">Terms of Service</a> and{' '}
                    <a href="#" className="text-white hover:text-cyber-blue transition-colors duration-300">Privacy Policy</a>
                  </label>
                  {errors.agreeToTerms && <p className="mt-1 text-sm text-red-400">{errors.agreeToTerms}</p>}
                </div>
              </div>

              {error && <div className="mb-4 text-red-400 text-center text-sm">{(error as any)?.data?.message || 'Signup failed. Please try again.'}</div>}
              {isSuccess && <div className="mb-4 text-green-400 text-center text-sm">Signup successful! Redirecting...</div>}

              <FuturisticButton type="submit" className="ml-30">
                {isSubmitting || isLoading ? 'Signing up...' : 'Sign Up'}
              </FuturisticButton>
            </form>

            <div className="text-center mt-8">
              <p className="text-gray-300">Already have an account?{' '}<Link to="/auth/login" className="text-white hover:text-cyber-blue transition-colors duration-300 font-semibold">Sign in here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
