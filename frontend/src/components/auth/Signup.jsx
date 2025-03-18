import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    password: "",
    role: "customer",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/signup",
        formData
      );
      console.log(res.data);
      alert("Signup Successful! Please Login to continue.");
      navigate("/login");
    } catch (error) {
      console.error(error.response.data);
      alert("Signup Failed!");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[380px] border border-gray-300">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Sign Up
        </h2>

        {/* Role Toggle with Sliding Animation */}
        <div className="relative flex items-center w-full mx-auto mb-4 bg-gray-200 rounded-full overflow-hidden mb-4">
          <motion.div
            className="absolute top-0 left-0 h-full w-1/2 bg-red-600 rounded-full"
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
            className={`relative z-10 flex-1 py-2 text-sm font-semibold transition-all  ${
              formData.role === "customer" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => handleRoleChange("customer")}
          >
            Customer
          </button>
          <button
            className={`relative z-10 flex-1 py-2 text-sm font-semibold transition-all ${
              formData.role === "milkman" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => handleRoleChange("milkman")}
          >
            Milkman
          </button>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-800 font-bold text-sm mb-0.5">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 placeholder:text-sm mb-3"
            onChange={handleChange}
          />

          <label className="block text-gray-800 font-bold text-sm mb-0.5">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 placeholder:text-sm mb-3"
            onChange={handleChange}
          />

          <label className="block text-gray-800 font-bold text-sm mb-0.5">
            Contact Number
          </label>
          <input
            type="text"
            name="contactNo"
            placeholder="Mobile Number"
            required
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 placeholder:text-sm mb-3"
            onChange={handleChange}
          />

          <label className="block text-gray-800 font-bold text-sm mb-0.5">
            Password
          </label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="At least 6 characters"
              required
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 placeholder:text-sm mb-2"
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-lg"
              onClick={togglePassword}
            >
              {showPassword ? (
                <MdVisibilityOff size={20} />
              ) : (
                <MdVisibility size={20} />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-800 py-1 rounded-full hover:bg-yellow-400 transition-all cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-gray-600 text-sm text-center mt-3">
          By continuing, you agree to our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
          .
        </p>

        <hr className="my-4 border-gray-300" />

        <p className="text-center text-gray-700 text-sm mb-2">
          Already have an account?
        </p>
        <a
          href="/login"
          className="block w-full text-center py-1 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-200 transition-all"
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default Signup;
