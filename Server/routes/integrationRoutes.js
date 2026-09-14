// Server / routes / integrationRoutes.js
import express from "express";
import { getGoogleConnectUrl } from "../controllers/integrationControllers.js";
import { auth } from "../middleware/auth.js";

const integrationRouter = express.Router();

integrationRouter.get("/google/connect", auth, getGoogleConnectUrl);

export default integrationRouter;
