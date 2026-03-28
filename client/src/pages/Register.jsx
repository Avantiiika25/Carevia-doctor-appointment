import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        "/users/register",
        formData
      );
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-pink-50 px-4">

      {/* 🔥 Background Blobs */}
      <div className="absolute w-72 h-72 bg-pink-300/30 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl bottom-10 right-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
          Create Account 🩺
        </h2>
        <p className="text-center text-gray-500 mt-1">
          Register to book your appointment
        </p>

        {/* ❌ Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 text-red-600 p-3 rounded-lg mt-4 text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">

          {/* 👤 Name */}
          <div className="relative">
            <input
              type="text"
              name="name"
              required
              onChange={handleChange}
              className="peer w-full px-4 pt-5 pb-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent"
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all 
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600">
              Full Name
            </label>
          </div>

          {/* 📧 Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              className="peer w-full px-4 pt-5 pb-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent"
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all 
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600">
              Email Address
            </label>
          </div>

          {/* 📱 Phone */}
          <div className="relative">
            <input
              type="tel"
              name="phone"
              required
              onChange={handleChange}
              className="peer w-full px-4 pt-5 pb-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent"
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all 
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600">
              Phone Number
            </label>
          </div>

          {/* 🔒 Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              minLength={8}
              onChange={handleChange}
              className="peer w-full px-4 pt-5 pb-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent"
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all 
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600">
              Password
            </label>

            {/* 👁️ Toggle */}
            <div
              className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-indigo-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          {/* 🔘 Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-pink-200 hover:scale-[1.02] transition duration-300 disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* 🔗 Login */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <Link
            to="/login"
            className="ml-1 font-medium bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;