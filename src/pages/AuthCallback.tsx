import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) {
      navigate("/");
      return;
    }

    const authenticate = async () => {
      initialized.current = true;
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API}/auth/github`,
          { code },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          },
        );

        // console.log(res.data);

        if (res.data.message === "Authentication Successful") {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Erro na autenticação:", error);
        navigate("/login?error=unauthorized");
      }
    };

    authenticate();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-gray-600 font-medium">Validando credenciais...</p>
    </div>
  );
}
