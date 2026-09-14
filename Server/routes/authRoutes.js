// Server / routes / authRoutes.js
import express from "express";
import {
  registerUser,
  requestRegistrationOTP,
} from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/request-otp", requestRegistrationOTP);

export default authRouter;
