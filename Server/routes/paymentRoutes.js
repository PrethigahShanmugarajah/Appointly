// Server / routes / paymentRoutes.js
import express from "express";
import { getPaymentOverview } from "../controllers/paymentControllers.js";
import { auth } from "../middleware/auth.js";

const paymentRouter = express.Router();

paymentRouter.get("/", auth, getPaymentOverview);

export default paymentRouter;
