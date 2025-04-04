"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdVisibility, MdVisibilityOff, MdArrowForward } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Role & Contact, Step 2: Other details
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    password: "",
    role: "customer",
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

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const handleNextStep = () => {
    // Validate contact number
    if (!formData.contactNo || formData.contactNo.length < 10) {
      alert("Please enter a valid contact number");
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/api/auth/signup`, formData);
      console.log(res.data);
      alert("Signup Successful! Please Login to continue.");

      navigate("/login");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Signup Failed!");
    }
  };

  const handleGoogleSignup = () => {
    // Pass the selected role and contact number to the Google OAuth endpoint
    const contactNo = formData.contactNo;
    window.location.href = `${backendUrl}/api/auth/google?action=signup&role=${formData.role}&contactNo=${contactNo}`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-[400px] border border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
            Sign Up
          </h2>
          <p className="text-gray-500 mt-2">
            {step === 1
              ? "Let's start with the basics"
              : "Complete your profile details"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Role Selection and Contact Number */}
              <div className="space-y-6">
                {/* Role Toggle with Sliding Animation */}
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium text-sm mb-1">
                    I am a:
                  </label>
                  <div className="relative flex items-center w-full mx-auto bg-gray-100 rounded-full overflow-hidden h-12">
                    <motion.div
                      className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full"
                      initial={{ x: formData.role === "customer" ? 0 : "100%" }}
                      animate={{ x: formData.role === "customer" ? 0 : "100%" }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 12,
                        bounce: 0.4,
                      }}
                    />
                    <button
                      type="button"
                      className={`relative z-10 flex-1 py-3 text-sm font-semibold transition-all ${
                        formData.role === "customer"
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                      onClick={() => handleRoleChange("customer")}
                    >
                      Customer
                    </button>
                    <button
                      type="button"
                      className={`relative z-10 flex-1 py-3 text-sm font-semibold transition-all ${
                        formData.role === "milkman"
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                      onClick={() => handleRoleChange("milkman")}
                    >
                      Milkman
                    </button>
                  </div>
                </div>

                {/* Contact Number */}
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium text-sm mb-1">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="contactNo"
                    placeholder="Enter your mobile number"
                    required
                    value={formData.contactNo}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder:text-gray-400 text-gray-800"
                    onChange={handleChange}
                  />
                  <p className="text-xs text-gray-500">
                    We'll use this for order updates and delivery notifications
                  </p>
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-gradient-to-r from-red-600 to-yellow-500 text-white py-3 rounded-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 font-medium"
                >
                  Continue
                  <MdArrowForward size={18} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 2: Other User Details */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium text-sm mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder:text-gray-400 text-gray-800"
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium text-sm mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder:text-gray-400 text-gray-800"
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium text-sm mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="At least 6 characters"
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
                  Sign Up
                </button>

                <div className="flex items-center my-4">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="px-3 text-gray-500 text-sm">OR</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* Google Sign Up Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 text-gray-700 hover:bg-gray-50 transition-all font-medium"
                >
                  <FcGoogle size={20} />
                  <span>Sign up with Google</span>
                </button>

                {/* Back Button */}
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-gray-600 py-2 text-sm hover:underline"
                >
                  ← Back to previous step
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-gray-600 text-sm text-center mt-6">
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

        <hr className="my-6 border-gray-200" />

        <p className="text-center text-gray-700 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-red-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
