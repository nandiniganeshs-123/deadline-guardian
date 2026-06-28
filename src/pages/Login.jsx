import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      setUser(user);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-pink-100">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-[400px] text-center">

        <h1 className="text-4xl font-bold mb-3">
          🤖 Guardian AI
        </h1>

        <p className="text-gray-500 mb-8">
          Your AI-powered productivity companion
        </p>

        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold"
        >
          Continue with Google
        </button>

      </div>
    </div>
  );
}