import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import frame from "../../assets/vector2.png";
import { BodyText, H2 } from "../../components/ui/typography";
import { IoMdCheckboxOutline, IoMdSquareOutline } from "react-icons/io";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../supabaseClient";

export const SignInPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly.");
      return;
    }

    setIsSubmitting(true);

    try {
      const user = await login(formData.email, formData.password);
      const hasSubscription = user.subscription?.status === "active";

      toast.success("Login successful!");

      if (hasSubscription) {
        navigate("/personal-account");
      } else {
        navigate("/personal-account-free");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      toast.error(err.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleGoogleLogin = async () => {
    const redirectUrl = import.meta.env.VITE_APP_REDIRECT_URL;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: redirectUrl },
    });

    if (error) {
      console.error("Google login error:", error.message);
      toast.error("Google login failed.");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue via-dark-grey to-ui-dark relative overflow-hidden font-font flex items-center justify-center w-full">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full"
        style={{
          backgroundImage:
            "url(https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-dark-blue/80 via-dark-grey/70 to-ui-dark/90"></div>

      <div className="relative z-30 flex justify-center items-center min-h-screen px-4 py-8">
        <div
          className={`bg-ui-medium/20 backdrop-blur-sm border border-[#8ef0f4] rounded-2xl 
  py-8 px-12 w-full max-w-4xl sm:max-w-5xl lg:max-w-6xl
  flex flex-col justify-center transition-all duration-1000 delay-500 ${
    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }`}
        >
          <div className="text-center mb-8">
            <H2 className="text-white font-font mb-4">Welcome back</H2>
            <BodyText className="text-gray-300 mb-6 text-base">
              Sign in to continue your photography
            </BodyText>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="email" className="text-gray-200 mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-6 py-4 text-base bg-ui-dark/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8ef0f4] ${
                  errors.email ? "border-red-500" : "border-primary/20"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-sm text-red-400 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="text-gray-200 mb-2 block">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-6 py-4 text-base bg-ui-dark/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8ef0f4] ${
                  errors.password ? "border-red-500" : "border-primary/20"
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-sm text-red-400 mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    rememberMe: !prev.rememberMe,
                  }))
                }
              >
                <div className="mt-1 text-white text-xl">
                  {formData.rememberMe ? (
                    <IoMdCheckboxOutline className="w-5 h-5" />
                  ) : (
                    <IoMdSquareOutline className="w-5 h-5" />
                  )}
                </div>
                <label
                  htmlFor="rememberMe"
                  className="text-sm text-gray-300 cursor-pointer"
                >
                  Remember me
                </label>
              </div>

              <Link
                to="/auth/forgot-password"
                className="text-sm text-gray-200 hover:text-cyber-blue transition"
              >
                Forgot password?
              </Link>
            </div>
            <div className="mt-6 flex flex-col items-center">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center gap-3 px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 font-medium hover:bg-gray-100 transition"
              >
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
            </div>
         

            <div className="w-full mt-6 flex justify-center">
              <div
                className="w-full max-w-xs h-[100px] bg-no-repeat bg-center bg-contain relative"
                style={{
                  backgroundImage: `url(${frame})`,
                  backgroundSize: "100% 100%",
                }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute inset-0 w-full h-full text-white text-sm sm:text-base font-semibold flex items-center justify-center"
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
