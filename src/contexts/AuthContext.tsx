import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  userId: number;
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
  userId: number | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User | void>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("access_token");
    const storedUserId = localStorage.getItem("user_id");

    if (storedUser && token && storedUserId) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        setUserId(Number(storedUserId));
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      const data = res.data;

      setUser(data.user);
      setUserId(data.user.userId);

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user_id", data.user.userId);

      if (data.user.subscription?.status === "active") {
        navigate("/after-subscription");
      } else {
        navigate("/personal-account-free");
      }

      return data.user;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    setUser(null);
    setUserId(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userId,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
