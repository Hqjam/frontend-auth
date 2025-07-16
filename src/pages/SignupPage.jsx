// SignupPage.jsx
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthForm from "../components/AuthForm";
import { toast } from 'react-toastify';

export default function SignupPage() {
  const navigate = useNavigate();

  const handleSignup = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/signup`, data);
      toast.success("Account created! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data || "Signup failed");
    }
  };

  return <AuthForm mode="signup" onSubmit={handleSignup} />;
}