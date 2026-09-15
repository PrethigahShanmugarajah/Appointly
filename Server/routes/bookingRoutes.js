// Server / routes / bookingRoutes.js
import express from "express";
import {
  listBookings,
  rescheduleBooking,
  updateBookingStatus,
} from "../controllers/bookingControllers.js";
import { auth } from "../middleware/auth.js";

const bookingRouter = express.Router();

bookingRouter.get("/", auth, listBookings);
bookingRouter.patch("/:id", auth, updateBookingStatus);
bookingRouter.patch("/:id/reschedule", auth, rescheduleBooking);

export default bookingRouter;
