import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import passport from "./config/passport.js";

//Loading the environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Middleware
app.use(express.json()); // Parse JSON requests

// Enable CORS
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true, // Setting credentials: true in the CORS configuration allows the browser to send cookies, HTTP authentication, and client-side SSL certificates along with cross-origin requests.
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Initialize passport
app.use(passport.initialize()); //set's up the passport and allows it to be used for authentication

// Authentication routes
app.use("/api/auth", authRoutes);

// Profile routes
app.use("/api", profileRoutes);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB Connection Error", error);
    process.exit(1);
  }
};

// Start server logic
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on http://localhost:${PORT} `);
});
