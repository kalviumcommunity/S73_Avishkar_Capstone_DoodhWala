import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import passport from "../config/passport.js";

// Signup Controller
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, contactNo } = req.body;
    console.log(role);

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const saltString = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltString);

    // Create a new User
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      contactNo,
    });
    console.log(newUser);
    a;
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        contactNo: newUser.contactNo,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Login Controller
export const loginUser = async (req, res) => {
  try {
    const { emailOrContact, password } = req.body;

    // Check if user exists
    const user = await User.findOne({
      $or: [{ email: emailOrContact }, { contactNo: emailOrContact }],
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "14d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        contactNo: user.contactNo,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Google Oauth Routes
export const initiateGoogleAuth = (req, res, next) => {
  // Pass query parameters directly to the strategy via the URL
  const action = req.query.action || "signup";
  const role = req.query.role || null;
  const contactNo = req.query.contactNo || null;

  // Continue with Google authentication, passing parameters in the state
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: Buffer.from(JSON.stringify({ action, role, contactNo })).toString(
      "base64"
    ),
  })(req, res, next);
};

export const handleGoogleCallback = (req, res, next) => {
  // Decode state parameter if it exists
  let stateData = {};
  if (req.query.state) {
    try {
      stateData = JSON.parse(Buffer.from(req.query.state, "base64").toString());
      // Add decoded data to the request query for the strategy to access
      req.query = { ...req.query, ...stateData };
    } catch (e) {
      console.error("Error decoding state:", e);
    }
  }

  passport.authenticate("google", (err, user, info) => {
    if (err) {
      // Handle specific error types
      if (err.message === "USER_ALREADY_EXISTS") {
        return res.redirect(
          `${
            process.env.CLIENT_URL || "http://localhost:5173"
          }/auth/google/callback?error=user_already_exists`
        );
      } else if (err.message === "USER_NOT_FOUND") {
        return res.redirect(
          `${
            process.env.CLIENT_URL || "http://localhost:5173"
          }/auth/google/callback?error=user_not_found`
        );
      } else if (err.message === "MISSING_SIGNUP_INFO") {
        return res.redirect(
          `${
            process.env.CLIENT_URL || "http://localhost:5173"
          }/auth/google/callback?error=missing_signup_info`
        );
      }

      // Generic error
      return res.redirect(
        `${
          process.env.CLIENT_URL || "http://localhost:5173"
        }/auth/google/callback?error=auth_failed`
      );
    }

    if (!user) {
      return res.redirect(
        `${
          process.env.CLIENT_URL || "http://localhost:5173"
        }/login?error=auth_failed`
      );
    }

    try {
      // Generate JWT token for the authenticated user
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "14d",
      });

      // Prepare user data for the frontend
      const userData = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        contactNo: user.contactNo || "",
      };

      // Get the client URL from environment variables or use default
      const clientURL = process.env.CLIENT_URL || "http://localhost:5173";

      // Redirect to frontend with token and user data
      return res.redirect(
        `${clientURL}/auth/google/callback?token=${token}&user=${encodeURIComponent(
          JSON.stringify(userData)
        )}`
      );
    } catch (error) {
      console.error("Error in Google callback:", error);
      return res.redirect(
        `${
          process.env.CLIENT_URL || "http://localhost:5173"
        }/login?error=auth_failed`
      );
    }
  })(req, res, next);
};
