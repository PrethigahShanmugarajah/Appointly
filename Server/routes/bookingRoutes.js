// Server / routes / bookingRoutes.js
import express from "express";
import {
  listBookings,
  updateBookingStatus,
} from "../controllers/bookingControllers.js";
import { auth } from "../middleware/auth.js";

const bookingRouter = express.Router();

bookingRouter.get("/", auth, listBookings);
bookingRouter.patch("/:id", auth, updateBookingStatus);

export default bookingRouter;
