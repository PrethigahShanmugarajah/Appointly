// Server / routes / publicRoutes.js
import express from "express";
import {
  getPublicBusiness,
  getPublicSlots,
  requestPublicBookingOtp,
} from "../controllers/publicControllers.js";

const publicRouter = express.Router();

publicRouter.get("/:slug", getPublicBusiness);
publicRouter.get("/:slug/slots", getPublicSlots);
publicRouter.post("/:slug/request-otp", requestPublicBookingOtp);

export default publicRouter;
