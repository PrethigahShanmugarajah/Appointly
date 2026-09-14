// Server / routes / bookingRoutes.js
import express from "express";
import { listBookings } from "../controllers/bookingControllers.js";
import { auth } from "../middleware/auth.js";

const bookingRouter = express.Router();

bookingRouter.get("/", auth, listBookings);

export default bookingRouter;
