// Server / routes / paymentRoutes.js
import express from "express";
import {
  getPaymentOverview,
  requestWithdrawal,
  updatePayoutDetails,
} from "../controllers/paymentControllers.js";
import { auth } from "../middleware/auth.js";

const paymentRouter = express.Router();

paymentRouter.get("/", auth, getPaymentOverview);
paymentRouter.put("/payout-details", auth, updatePayoutDetails);
paymentRouter.post("/withdrawals", auth, requestWithdrawal);

export default paymentRouter;
