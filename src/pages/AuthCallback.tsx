import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AuthCallback mounted, URL:", window.location.href);

    const handleCallback = async () => {
      try {
        // Try hash (#) first, then fallback to query (?)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const searchParams = new URLSearchParams(window.location.search);

        const access_token =
          hashParams.get("access_token") || searchParams.get("access_token");
        const refresh_token =
          hashParams.get("refresh_token") || searchParams.get("refresh_token");

        if (!access_token || !refresh_token) {
          console.error("❌ No tokens found in callback URL");
          navigate("/auth/hamza");
          return;
        }

        // Set Supabase session (stores in localStorage automatically)
        const { data, error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) {
          console.error("❌ Auth error:", error.message);
          navigate("/auth/hamza");
          return;
        }

        console.log("✅ Supabase data:", data);

        // Save useful data to localStorage for later use
        if (data?.session) {
          const { user, access_token, refresh_token } = data.session;

          // Store tokens (already stored by Supabase, but we can store copies)
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);

          // Store Supabase user object
          localStorage.setItem("supabase_user", JSON.stringify(user));

          // If your backend sends extra user info (like userId, stripe_customer_id)
          // Save that too if available
          const customUser = {
            userId: user?.user_metadata?.userId || null,
            name: user?.user_metadata?.full_name || user?.user_metadata?.name,
            email: user?.email,
            stripe_customer_id: user?.user_metadata?.stripe_customer_id || null,
          };
          localStorage.setItem("custom_user", JSON.stringify(customUser));

          console.log("📦 Stored in localStorage:", {
            access_token,
            refresh_token,
            supabase_user: user,
            custom_user: customUser,
          });

          navigate("/personal-account");
        } else {
          console.warn("⚠️ No session found after setting");
          navigate("/auth/hamza");
        }
      } catch (err) {
        console.error("💥 Unexpected error:", err);
        navigate("/auth/hamza");
      }
    };

    handleCallback();
  }, [navigate]);

  return <p className="text-white text-center">Finishing login…</p>;
}
