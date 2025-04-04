"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("email"); // Toggle between email and contactNo
  const [formData, setFormData] = useState({
    emailOrContact: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [backendUrl, setBackendUrl] = useState("http://localhost:8000");

  useEffect(() => {
    // Get the backend URL from environment or use default
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
    setBackendUrl(apiUrl);
  }, []);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${backendUrl}/api/auth/login`, {
        emailOrContact: formData.emailOrContact,
        password: formData.password,
      });

      // Store the token and userRole in Local Storage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userRole", res.data.user.role);
      localStorage.setItem("userName", res.data.user.name);

      console.log(res.data);
      alert("Login Successful!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Login Failed!");
    }
  };

  const handleGoogleLogin = () => {
    // Direct the user to the Google OAuth endpoint for login
    // We'll handle non-existing users in the callback
    window.location.href = `${backendUrl}/api/auth/google?action=login`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-[400px] border border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-500 mt-2">
            Sign in to continue to your account
          </p>
        </div>

        {/* Toggle Email/Contact */}
        <div className="relative flex items-center w-full mb-6 bg-gray-100 rounded-full overflow-hidden h-12">
          <motion.div
            className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full"
            initial={{ x: method === "email" ? 0 : "100%" }}
            animate={{ x: method === "email" ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 150, damping: 12 }}
          />
          <button
            className={`relative z-10 flex-1 py-3 text-sm font-semibold cursor-pointer ${
              method === "email" ? "text-white" : "text-gray-500"
            }`}
            onClick={() => setMethod("email")}
          >
            Email
          </button>
          <button
            className={`relative z-10 flex-1 py-3 text-sm font-semibold cursor-pointer ${
              method === "contact" ? "text-white" : "text-gray-500"
            }`}
            onClick={() => setMethod("contact")}
          >
            Contact
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            {/* Animated Label */}
            <AnimatePresence mode="wait">
              <motion.label
                key={method} // This will trigger re-animation when method changes
                className="block text-gray-700 font-medium text-sm mb-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {method === "email" ? "Email" : "Mobile Number"}
              </motion.label>
            </AnimatePresence>

            {/* Animated Input Field */}
            <motion.input
              key={method} // Ensures re-render with animation
              type={method === "email" ? "email" : "tel"}
              name="emailOrContact"
              placeholder={
                method === "email"
                  ? "Enter your email"
                  : "Enter your mobile number"
              }
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder:text-gray-400 text-gray-800"
              onChange={handleChange}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-gray-700 font-medium text-sm">
                Password
              </label>
              <a href="#" className="text-xs text-red-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder:text-gray-400 text-gray-800"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={togglePassword}
              >
                {showPassword ? (
                  <MdVisibilityOff size={20} />
                ) : (
                  <MdVisibility size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-yellow-500 text-white py-3 rounded-lg hover:opacity-95 transition-all font-medium"
          >
            Sign in
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 text-gray-700 hover:bg-gray-50 transition-all font-medium"
          >
            <FcGoogle size={20} />
            <span>Sign in with Google</span>
          </button>

          <p className="text-gray-600 text-sm text-center mt-4">
            By continuing, you agree to our{" "}
            <a href="#" className="text-red-600 hover:underline">
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-red-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </form>

        <hr className="my-6 border-gray-200" />

        <p className="text-center text-gray-700 text-sm">
          New to this site?{" "}
          <a
            href="/signup"
            className="text-red-600 font-medium hover:underline"
          >
            Create your account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
