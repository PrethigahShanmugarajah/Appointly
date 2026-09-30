import express from "express";
import {
  getGoogleConnectUrl,
  handleGoogleCallback,
} from "../controllers/integrationControllers.js";
import { auth } from "../middleware/auth.js";

const integrationRouter = express.Router();

integrationRouter.get("/google/connect", auth, getGoogleConnectUrl);
integrationRouter.get("/google/callback", handleGoogleCallback);

export default integrationRouter;
