// Server / routes / publicRoutes.js
import express from "express";
import {
  getPublicBusiness,
  getPublicSlots,
} from "../controllers/publicControllers.js";

const publicRouter = express.Router();

publicRouter.get("/:slug", getPublicBusiness);
publicRouter.get("/:slug/slots", getPublicSlots);

export default publicRouter;
