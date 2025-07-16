// LoginPage.jsx
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthForm from "../components/AuthForm";
import { toast } from 'react-toastify';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { email: data.email, password: data.password },
        { withCredentials: true }
      );
      toast.success("Login successful!");
      navigate("/feed");
    } catch (err) {
      toast.error(err.response?.data || "Login failed");
    }
  };

  return <AuthForm mode="login" onSubmit={handleLogin} />;
}