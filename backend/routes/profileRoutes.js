import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected route for profile
router.get("/profile", protect, (req, res) => {
  res.json({ message: "Profile data accessed", user: req.user });
});

export default router;
