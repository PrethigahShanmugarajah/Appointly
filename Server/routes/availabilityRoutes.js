// Server / routes / availabilityRoutes.js
import express from "express";
import {
  listAvailability,
  saveAvailability,
} from "../controllers/availabilityControllers.js";
import { auth } from "../middleware/auth.js";

const availabilityRouter = express.Router();

availabilityRouter.get("/", auth, listAvailability);
availabilityRouter.post("/", auth, saveAvailability);

export default availabilityRouter;
