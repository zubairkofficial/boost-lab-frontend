import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { H1, BodyText } from "./ui/typography";
import {
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
} from "../store/userSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "user" | "admin";
  fallbackPath?: string;
  requireSubscription?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole = "user",
  fallbackPath = "/auth/login",
  requireSubscription = false,
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  console.log("isAuthenticated",isAuthenticated)
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const location = useLocation();
  const [hasActiveSubscription, setHasActiveSubscription] = useState<
    boolean | null
  >(null);
  const [checkingSubscription, setCheckingSubscription] = useState(false);
  useEffect(() => {
    const checkSubscription = async () => {
      if (!isAuthenticated || !user || !requireSubscription) {
        setHasActiveSubscription(true);
        return;
      }

      setCheckingSubscription(true);
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/plans/active-subscription/${
            userInfo.id
          }`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.ok) {
          setHasActiveSubscription(true);
        } else {
          setHasActiveSubscription(false);
        }
      } catch (error) {
        console.error("Error checking subscription:", error);
        setHasActiveSubscription(false);
      } finally {
        setCheckingSubscription(false);
      }
    };

    checkSubscription();
  }, [isAuthenticated, user, requireSubscription]);

  if (isLoading || checkingSubscription) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <H1 className="text-white font-font">Loading...</H1>
          <BodyText className="text-gray-300 font-font">
            Please wait while we verify your credentials
          </BodyText>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={fallbackPath}
        state={{
          from: location,
          message: "Please sign in to access this page.",
        }}
        replace
      />
    );
  }

  if (user && requiredRole === "admin" && user.role !== "admin") {
    return (
      <Navigate
        to="/dashboard"
        state={{ message: "Access denied. Admin privileges required." }}
        replace
      />
    );
  }

  if (requireSubscription && hasActiveSubscription === false) {
    return (
      <Navigate
        to="/plans"
        state={{ message: "Active subscription required to access this page." }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
