import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Login = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("email"); // Toggle between email and contactNo
  const [formData, setFormData] = useState({
    emailOrContact: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        emailOrContact: formData.emailOrContact,
        password: formData.password,
      });

      // Store the token in Local Storage
      localStorage.setItem("token", res.data.token);

      console.log(res.data);
      alert("Login Successful!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Login Failed!");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-sm border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-5">
          Sign in
        </h2>

        {/* Toggle Email/Contact */}
        <div className="relative flex items-center w-full mb-4 bg-gray-200 rounded-full overflow-hidden ">
          <motion.div
            className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full "
            initial={{ x: method === "email" ? 0 : "100%" }}
            animate={{ x: method === "email" ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 150, damping: 12 }}
          />
          <button
            className={`relative z-10 flex-1 py-2 text-sm font-semibold cursor-pointer ${
              method === "email" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setMethod("email")}
          >
            Email
          </button>
          <button
            className={`relative z-10 flex-1 py-2 text-sm font-semibold cursor-pointer ${
              method === "contact" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setMethod("contact")}
          >
            Contact
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {/* Animated Label */}
            <AnimatePresence mode="wait">
              <motion.label
                key={method} // This will trigger re-animation when method changes
                className="block text-gray-800 font-bold text-sm mb-0.5"
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
              placeholder={method === "email" ? "Email" : "Mobile number"}
              required
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 placeholder:text-sm"
              onChange={handleChange}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800 font-bold text-sm mb-0.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="At least 6 characters"
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 placeholder:text-sm"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg  cursor-pointer"
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
            className="w-full bg-yellow-400 text-gray-800 py-1 rounded-full hover:bg-yellow-400 transition-all cursor-pointer"
          >
            Sign in
          </button>
        </form>

        <p className="text-gray-600 text-sm text-center mt-3">
          By continuing, you agree to our
          <a href="#" className="text-blue-500 hover:underline">
            {" "}
            Terms & Conditions{" "}
          </a>
          and
          <a href="#" className="text-blue-500 hover:underline">
            {" "}
            Privacy Policy
          </a>
          .
        </p>

        <hr className="my-4 border-gray-300" />

        <p className="text-center text-gray-700 text-sm mb-2">
          New to this site?
        </p>
        <a
          href="/signup"
          className="block w-full text-center py-1 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-200 transition-all"
        >
          Create your account
        </a>
      </div>
    </div>
  );
};

export default Login;
