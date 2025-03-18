import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

// Protected testing route example
router.get("/profile", protect, (req, res) => {
  res.json({ message: "Profile data accessed", user: req.user });
});

export default router;
