import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleSession = async () => {
      const { data, error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      );

      if (error) {
        console.error("Auth error:", error.message);
        navigate("/auth/login");
        return;
      }

      if (data.session) {
        navigate("/personal-account");
      } else {
        navigate("/auth/login");
      }
    };

    handleSession();
  }, [navigate]);

  return <p className="text-white text-center">Finishing login…</p>;
}
