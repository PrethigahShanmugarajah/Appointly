// Server / routes / authRoutes.js
import express from "express";
import {
  registerUser,
  requestRegistrationOTP,
  verifyRegistrationOTP,
} from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/request-otp", requestRegistrationOTP);
authRouter.post("/verify-otp", verifyRegistrationOTP);

export default authRouter;
