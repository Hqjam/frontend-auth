import { useState } from "react";

export default function AuthForm({ mode, onSubmit }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-600">
        {mode === "signup" ? "Create Account" : "Welcome Back"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
{mode === "signup" && (
  <>
    <input
      name="firstName"
      placeholder="First Name"
      required
      className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
      onChange={handleChange}
    />
    <input
      name="lastName"
      placeholder="Last Name"
      required
      className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
      onChange={handleChange}
    />
    {/* NEW */}
    <input
      name="age"
      type="number"
      min="18"
      placeholder="Age"
      required
      className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
      onChange={handleChange}
    />
    <select
      name="gender"
      required
      className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
      onChange={handleChange}
    >
      <option value="">Select gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>
  </>
)}
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 6)"
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
        >
          {mode === "signup" ? "Sign Up 🚀" : "Log In 🔐"}
        </button>
      </form>
    </div>
  );
}