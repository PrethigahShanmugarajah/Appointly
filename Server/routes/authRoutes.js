// Server / routes / authRoutes.js
import express from "express";
import {
  loginUser,
  registerUser,
  requestRegistrationOTP,
  verifyRegistrationOTP,
} from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/request-otp", requestRegistrationOTP);
authRouter.post("/verify-otp", verifyRegistrationOTP);
authRouter.post("/login", loginUser);

export default authRouter;
