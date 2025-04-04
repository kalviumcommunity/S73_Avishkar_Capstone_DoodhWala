"use client";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MilkDropLoader from "../components/ui/MilkDropLoader";

const GoogleCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get token and user data from URL parameters
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const userString = params.get("user");
        const errorParam = params.get("error");

        if (errorParam) {
          setLoading(false);

          // Handle specific error types
          if (errorParam === "user_already_exists") {
            setErrorType("user_already_exists");
            setError(
              "You already have an account with this email. Please login to continue."
            );

            // Redirect to login page after a short delay
            setTimeout(() => {
              navigate("/login");
            }, 3000);
            return;
          } else if (errorParam === "user_not_found") {
            setErrorType("user_not_found");
            setError("Account not found. Please sign up first.");

            // Redirect to signup page after a short delay
            setTimeout(() => {
              navigate("/signup");
            }, 3000);
            return;
          } else if (errorParam === "missing_signup_info") {
            setErrorType("missing_signup_info");
            setError("Please provide all required information to sign up.");

            // Redirect to signup page after a short delay
            setTimeout(() => {
              navigate("/signup");
            }, 3000);
            return;
          } else {
            setError("Authentication failed. Please try again.");
            return;
          }
        }

        if (!token || !userString) {
          setError("Invalid authentication response. Please try again.");
          setLoading(false);
          return;
        }

        // Parse user data
        const user = JSON.parse(decodeURIComponent(userString));

        // Store token and user info in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("userName", user.name);

        // Clear temporary storage
        localStorage.removeItem("tempContactNo");
        localStorage.removeItem("tempUserRole");

        console.log("Authentication successful:", user);

        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        console.error("Error during Google authentication:", error);
        setError("An error occurred during authentication. Please try again.");
        setLoading(false);
      }
    };

    handleCallback();
  }, [navigate, location]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-sky-100 to-sky-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        {loading && !error ? (
          <>
            <h2 className="text-2xl font-semibold text-sky-600 mb-6">
              Logging you in...
            </h2>
            <div className="flex justify-center">
              <MilkDropLoader />
            </div>
          </>
        ) : error ? (
          <>
            <h2
              className={`text-2xl font-semibold mb-4 text-center ${
                errorType === "user_already_exists"
                  ? "text-blue-600"
                  : "text-red-600"
              }`}
            >
              {errorType === "user_already_exists"
                ? "Account Found"
                : "Authentication Error"}
            </h2>
            <p className="text-gray-600 text-center mb-6">{error}</p>
            <div className="flex justify-center">
              <button
                onClick={() =>
                  errorType === "user_already_exists" ||
                  errorType === "user_not_found"
                    ? navigate(
                        errorType === "user_already_exists"
                          ? "/login"
                          : "/signup"
                      )
                    : navigate("/login")
                }
                className="bg-gradient-to-r from-red-600 to-yellow-500 text-white px-6 py-2 rounded-lg hover:opacity-95 transition-colors"
              >
                {errorType === "user_already_exists"
                  ? "Go to Login"
                  : errorType === "user_not_found"
                  ? "Go to Signup"
                  : "Back to Login"}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-green-600 mb-4 text-center">
              Login Successful!
            </h2>
            <p className="text-gray-600 text-center mb-6">
              You are being redirected to the dashboard...
            </p>
            <div className="flex justify-center">
              <MilkDropLoader />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleCallbackPage;
