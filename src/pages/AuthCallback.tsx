import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AuthCallback mounted, current URL:", window.location.href);

    const handleCallback = async () => {
      try {

        const url = new URL(window.location.href);
        const access_token = url.searchParams.get("access_token");
        const refresh_token = url.searchParams.get("refresh_token");

        if (!access_token || !refresh_token) {
          console.error("No tokens found in callback URL");
          navigate("/auth/hamza");
          return;
        }
        const { data, error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) {
          console.error("Auth error:", error.message);
          navigate("/auth/hamza");
          return;
        }

        console.log("Supabase data:", data);

        if (data?.session) {
          console.log("User session:", data.session);
          navigate("/personal-account");
        } else {
          navigate("/auth/hamza");
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        navigate("/auth/hamza");
      }
    };

    handleCallback();
  }, [navigate]);

  return <p className="text-white text-center">Finishing login…</p>;
}
