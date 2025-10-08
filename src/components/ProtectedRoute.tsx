import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loader from "./Loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "user" | "admin";
  fallbackPath?: string;
  requireSubscription?: boolean;
  blockIfSubscribed?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole = "user",
  fallbackPath = "/auth/login",
  requireSubscription = false,
  blockIfSubscribed = false,
}) => {
  const { user, isAuthenticated, isLoading = true } = useAuth();
  const location = useLocation();
  const [hasActiveSubscription, setHasActiveSubscription] = useState<
    boolean | null
  >(null);
  const [checkingSubscription, setCheckingSubscription] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!isAuthenticated || !user) {
        setHasActiveSubscription(false);
        return;
      }

      if (!requireSubscription && !blockIfSubscribed) {
        setHasActiveSubscription(true);
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
          if (response.status === 404) {
            setHasActiveSubscription(false);
            return;
          }
          console.warn("Failed to check subscription, keeping state null");
          setHasActiveSubscription(null);
          return;
        }

        const data = await response.json();
        const isActive =
          data?.status === "active" || data?.subscription?.status === "active";

        setHasActiveSubscription(isActive);
      } catch (error) {
        console.error("Error checking subscription:", error);
        setHasActiveSubscription(null);
      } finally {
        setCheckingSubscription(false);
      }
    };

    checkSubscription();
  }, [isAuthenticated, user, requireSubscription, blockIfSubscribed]);

  if (isLoading || checkingSubscription || hasActiveSubscription === null) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage:
            "url(https://static.tildacdn.net/tild6534-6232-4333-a431-313138303165/bg_1_1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          fontFamily: `'PT Sans', sans-serif`,
        }}
      >
        <Loader />
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
        to="/personal-account-free"
        state={{ message: "Active subscription required to access this page." }}
        replace
      />
    );
  }

  if (blockIfSubscribed && hasActiveSubscription === true) {
    return <Navigate to="/personal-account" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
