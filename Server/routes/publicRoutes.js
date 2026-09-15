// Server / routes / publicRoutes.js
import express from "express";
import { getPublicBusiness } from "../controllers/publicControllers.js";

const publicRouter = express.Router();

publicRouter.get("/:slug", getPublicBusiness);

export default publicRouter;
