import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSignupMutation } from "../../features/auth/authApi";
import { useToast } from "../../contexts/ToastContext";
import { setUser } from "../../store/userSlice";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [signup, { isLoading }] = useSignupMutation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
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
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showError("Please correct the highlighted errors");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/auth/register?email=${encodeURIComponent(
          formData.email
        )}&password=${encodeURIComponent(formData.password)}`,
        {
          method: "POST",
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Signup failed");
      }

      const result = await res.json();
console.log("result",result)
      // Save tokens & user info locally, just like login
        localStorage.setItem("access_token", result.access_token);
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("userInfo", JSON.stringify(result.userInfo));

      dispatch(setUser({ user: result.user, userInfo: result.userInfo }));

      showSuccess("Account created and logged in!");

      navigate("/personal-account-free");
    } catch (err: any) {
      showError("Signup Failed", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl text-white font-bold text-center">Sign Up</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded border"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded border"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded border"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded border"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
          />
          <span className="text-white">I agree to the terms</span>
        </label>
        {errors.agreeToTerms && (
          <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting || isLoading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-center text-gray-300 mt-4">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
