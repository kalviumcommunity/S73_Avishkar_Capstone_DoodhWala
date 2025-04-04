import express from "express";
import {
  registerUser,
  loginUser,
  initiateGoogleAuth,
  handleGoogleCallback,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

//Google Oauth Routes
router.get("/google", initiateGoogleAuth);
router.get("/google/callback", handleGoogleCallback);

export default router;
