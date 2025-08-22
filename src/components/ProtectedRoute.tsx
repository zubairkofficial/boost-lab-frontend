import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const [hasActiveSubscription, setHasActiveSubscription] = useState<
    boolean | null
  >(null);
  const [checkingSubscription, setCheckingSubscription] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!isAuthenticated || !user || !requireSubscription) {
        setHasActiveSubscription(true); // allow access
        return;
      }

      setCheckingSubscription(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/plans/active-subscription/${
            user.userId
          }`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (!response.ok) {
          setHasActiveSubscription(false);
          return;
        }

        const data = await response.json();

        // backend should return subscription object or { status: "active" }
        const isActive =
          data?.status === "active" || data?.subscription?.status === "active";

        setHasActiveSubscription(isActive);
      } catch (error) {
        console.error("Error checking subscription:", error);
        setHasActiveSubscription(false);
      } finally {
        setCheckingSubscription(false);
      }
    };

    checkSubscription();
  }, [isAuthenticated, user, requireSubscription]);

  if (isLoading || checkingSubscription || hasActiveSubscription === null) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-white font-font">Loading...</h1>
          <p className="text-gray-300 font-font">
            Please wait while we verify your credentials
          </p>
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
