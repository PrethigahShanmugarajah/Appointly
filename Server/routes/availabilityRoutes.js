// Server / routes / availabilityRoutes.js
import express from "express";
import { listAvailability } from "../controllers/availabilityControllers.js";
import { auth } from "../middleware/auth.js";

const availabilityRouter = express.Router();

availabilityRouter.get("/", auth, listAvailability);

export default availabilityRouter;
