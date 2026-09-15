// Server / routes / publicRoutes.js
import express from "express";
import {
  cancelPublicBookingPayment,
  createPublicBooking,
  getBookingStatus,
  getPublicBusiness,
  getPublicSlots,
  requestPublicBookingOtp,
  verifyPublicBookingOtp,
} from "../controllers/publicControllers.js";

const publicRouter = express.Router();

publicRouter.get("/:slug", getPublicBusiness);
publicRouter.get("/:slug/slots", getPublicSlots);
publicRouter.post("/:slug/request-otp", requestPublicBookingOtp);
publicRouter.post("/:slug/verify-otp", verifyPublicBookingOtp);
publicRouter.post("/:slug/book", createPublicBooking);
publicRouter.get("/booking/status", getBookingStatus);
publicRouter.post("/booking/cancel-payment", cancelPublicBookingPayment);

export default publicRouter;
