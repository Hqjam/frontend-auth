import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        { withCredentials: true }
      );
      logout();
      navigate("/");
    } catch {
      /* silent fail */
    }
  };

  return (
    <nav className="w-full bg-white/10 backdrop-blur-md p-4 flex items-center justify-between text-white">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/feed")}>
        Dev<span className="text-yellow-300">Swipe</span>
      </h1>

      <div className="flex items-center gap-4 text-sm sm:text-base">
        <button
          onClick={() => navigate("/matches")}
          className="hover:text-yellow-300 transition">
          Matches
        </button>

        <button
          onClick={() => navigate("/requests")}
          className="hover:text-yellow-300 transition">
          Requests
        </button>

        <button
          onClick={() => navigate("/sent")}
          className="hover:text-yellow-300 transition">
          Sent
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="hover:text-yellow-300 transition">
          My Profile
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </nav>
  );
}
