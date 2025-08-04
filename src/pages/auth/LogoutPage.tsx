import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LogoutPage() {
  const navigate = useNavigate();
  const hasLoggedOut = useRef(false); 

  useEffect(() => {
    if (hasLoggedOut.current) return;

    hasLoggedOut.current = true;
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    toast.success("Signed out successfully");
    navigate("/auth/login");
  }, [navigate]);

  return null;
}
