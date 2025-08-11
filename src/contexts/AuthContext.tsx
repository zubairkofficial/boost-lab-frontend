import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useSignupMutation } from "../features/auth/authApi";

interface User {
  id: string;
  name?: string;
  email: string;
  role: "user" | "admin";
  subscription?: {
    plan: string;
    status: "active" | "inactive" | "cancelled";
    expiresAt: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<User>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginMutation] = useLoginMutation();
  const [signupMutation] = useSignupMutation();

  // Check auth on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const userData = localStorage.getItem("user");
        if (token && userData) {
          // Verify token with backend
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/auth/verify`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (response.ok) {
            const userObj = JSON.parse(userData);
            setUser(userObj);
          } else {
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    const result = await loginMutation({ email, password }).unwrap();

    localStorage.setItem("access_token", result.access_token);
    localStorage.setItem("user", JSON.stringify(result.user));
    setUser(result.user);

    return result.user;
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<User> => {
    await signupMutation({ name, email, password }).unwrap();

    // After signup, login to get tokens and user
    const loginResult = await loginMutation({ email, password }).unwrap();

    localStorage.setItem("access_token", loginResult.access_token);
    localStorage.setItem("user", JSON.stringify(loginResult.user));
    setUser(loginResult.user);

    return loginResult.user;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    signup,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
