import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../contexts/AuthContext";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { setUser, setUserId } = useAuth();

  useEffect(() => {
    const handleSession = async () => {
      try {
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );
        const access_token = hashParams.get("access_token");
        const refresh_token = hashParams.get("refresh_token");

        if (!access_token || !refresh_token) {
          console.error("No tokens found in callback URL");
          navigate("/auth/login");
          return;
        }

        const { data, error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });
        if (error || !data.session) {
          console.error("Auth error:", error?.message);
          navigate("/auth/login");
          return;
        }

        const supabaseUser = data.session.user;

        const { data: userRow, error: fetchError } = await supabase
          .from("users")
          .select("id, name, email, stripe_customer_id")
          .eq("auth_uid", supabaseUser.id)
          .single();

        if (fetchError || !userRow) {
          console.error("Failed to fetch user from DB:", fetchError?.message);
          navigate("/auth/login");
          return;
        }

        const dynamicUser = {
          userId: userRow.id,
          name:
            userRow.name ||
            supabaseUser.user_metadata?.full_name ||
            supabaseUser.email,
          email: userRow.email,
          stripe_customer_id: userRow.stripe_customer_id,
          role: "user" as const,
        };

        console.log("User logged in:", dynamicUser);
        setUser?.(dynamicUser);
        setUserId?.(dynamicUser.userId);

        localStorage.setItem("user", JSON.stringify(dynamicUser));
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("user_id", dynamicUser.userId.toString());

        navigate("/personal-account");
      } catch (err) {
        console.error("Unexpected error:", err);
        navigate("/auth/login");
      }
    };

    handleSession();
  }, [navigate, setUser, setUserId]);

  return <p className="text-white text-center">Finishing login…</p>;
}
