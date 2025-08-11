import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import frame from "../../assets/vector2.png";
import { useLoginMutation } from "../../features/auth/authApi";
import { BodyText, H2 } from "../../components/ui/typography";
import { setUser } from "../../store/userSlice";
import { IoMdCheckboxOutline, IoMdSquareOutline } from "react-icons/io";

export const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
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
      const url = `${
        import.meta.env.VITE_BASE_URL
      }/auth/login?email=${encodeURIComponent(
        formData.email
      )}&password=${encodeURIComponent(formData.password)}`;
      const res = await fetch(url, {
        method: "POST",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      const result = await res.json();

      localStorage.setItem("access_token", result.access_token);
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("userInfo", JSON.stringify(result.userInfo));

      dispatch(setUser({ user: result.user, userInfo: result.userInfo }));

      toast.success("Login successful! Checking subscription...");

      const hasSubscription =
        !!result.userInfo?.planId && !!result.userInfo?.plan;

      console.log("[DEBUG] planId:", result.userInfo?.planId);
      console.log("[DEBUG] plan:", result.userInfo?.plan);
      console.log(
        "[DEBUG] hasSubscription:.....................",
        hasSubscription
      );

      if (hasSubscription) {
        navigate("/after-subscription");
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

  return (
    <div className="min-h-screen bg-[#293C44] relative overflow-hidden font-font flex items-center justify-center w-full">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage:
            "url(https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
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

      <div className="relative z-30 flex justify-center items-center min-h-screen px-4 py-8">
        <div
          className={`bg-ui-medium/50 backdrop-blur-sm border border-[#8ef0f4] rounded-2xl 
            p-6 sm:p-16 w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl
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
                  disabled={isSubmitting || isLoading}
                  className="absolute inset-0 w-full h-full text-white text-sm sm:text-base font-semibold flex items-center justify-center"
                >
                  {isSubmitting || isLoading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </div>
          </form>

          <div className="text-center mt-8">
            <p className="text-gray-300">
              Don’t have an account?{" "}
              <Link
                to="/auth/signup"
                className="text-white hover:text-cyber-blue font-semibold"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
