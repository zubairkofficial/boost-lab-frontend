import React from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import iconImage from "../../assets/quiz.svg";

interface SignupCardProps {
  userInfo: { name: string; email: string; password: string };
  setUserInfo: React.Dispatch<
    React.SetStateAction<{ name: string; email: string; password: string }>
  >;
  answers: string[];
  questions: { question: string; choices: string[] }[];
  navigate: (path: string) => void;
}

export default function SignupCard({
  userInfo,
  setUserInfo,
  answers,
  questions,
  navigate,
}: SignupCardProps) {
  const { setUser } = useAuth();

  const handleSubmit = async () => {
    if (!userInfo.name || !userInfo.email || !userInfo.password) {
      toast.error("Please fill all signup details");
      return;
    }

    if (answers.length !== 5 || answers.some((a) => !a)) {
      toast.error("Please answer all 5 questions before submitting.");
      return;
    }

    try {
      const payload = {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
        answers: questions.map((q, i) => ({
          question: q.question,
          choice: answers[i],
        })),
      };

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        if (data.message?.toLowerCase().includes("already exists")) {
          toast.error("Email already registered. Redirecting to login...");
          navigate("/auth/login");
          return;
        }
        throw new Error(data.message || "Signup failed");
      }
      if (!res.ok) throw new Error(data.message || "Signup failed");

      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("user_id", data.user.userId.toString());

      setUser(data.user);

      toast.success("Signup successful! Redirecting...");
      navigate("/personal-account-free");
    } catch (err: any) {
      console.error("Submit error:", err);
      toast.error(err?.message || "Error submitting signup");
    }
  };

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -50 },
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#063241] text-white flex flex-col py-10 w-full px-14 container mx-autos"
    >
      <div className="flex items-center space-x-3 mb-6 px-10">
        <img src={iconImage} alt="Icon" className="w-8 h-8" />
        <h1 className="text-2xl font-semibold">Find Out Your Photo Identity</h1>
      </div>
      <div className="w-full bg-[#05454E] h-1.5 rounded-full mb-10 mx-auto">
        <div className="bg-[#62D4D8] h-1.5 w-[100%] rounded-full"></div>
      </div>
      <div
        className="flex-1 flex flex-col justify-center px-10"
        style={{ fontFamily: "'Unbounded', sans-serif" }}
      >
        <h2 className="text-2xl font-semibold mb-3 text-[#8EF0F4]">
          You're one step away from your result
        </h2>
        <p className="mb-10 text-sm text-[#8EF0F4]">
          Enter your name and email to get your Photo Identity instantly
        </p>

        {["name", "email", "password"].map((field) => (
          <div key={field} className="mb-6">
            <label className="block mb-2 font-semibold text-[#8EF0F4]">
              {field === "name"
                ? "Full name"
                : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              className="w-full p-4 rounded-md text-[#8EF0F4] placeholder-gray-300 bg-[#1E4A57] focus:outline-none "
              placeholder={
                field === "name"
                  ? "Sarah Cohen"
                  : field === "email"
                  ? "Email"
                  : "Enter Password"
              }
              type={
                field === "password"
                  ? "password"
                  : field === "email"
                  ? "email"
                  : "text"
              }
              value={userInfo[field as keyof typeof userInfo]}
              onChange={(e) =>
                setUserInfo({ ...userInfo, [field]: e.target.value })
              }
            />
          </div>
        ))}

        <div className="flex items-center mb-10">
          <input
            type="checkbox"
            defaultChecked
            className="mr-2 w-4 h-4 accent-cyan-400"
          />
          <span className="text-sm">
            I agree to the terms of the{" "}
            <span className="text-orange-400">Privacy Policy.</span>
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center px-10">
        <p className="text-sm">Step: 6/6</p>
        <div className="flex gap-2">
          <button className="bg-[#1E4A57] p-3  hover:bg-[#255a6b] transition">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 font-semibold transition bg-[#8EF0F4] text-[#013440] hover:bg-[#7be5ea]"
          >
            Submit
          </button>
        </div>
      </div>
    </motion.div>
  );
}
