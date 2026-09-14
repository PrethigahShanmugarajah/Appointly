// Server / routes / authRoutes.js
import express from "express";
import {
  getMe,
  loginUser,
  registerUser,
  requestRegistrationOTP,
  updateProfile,
  verifyRegistrationOTP,
} from "../controllers/authControllers.js";
import { auth } from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/request-otp", requestRegistrationOTP);
authRouter.post("/verify-otp", verifyRegistrationOTP);
authRouter.post("/login", loginUser);
authRouter.get("/me", auth, getMe);
authRouter.put("/profile", auth, updateProfile);

export default authRouter;
