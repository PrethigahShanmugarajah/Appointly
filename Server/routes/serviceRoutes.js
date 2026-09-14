// Server / routes / serviceRoutes.js
import express from "express";
import { listServices } from "../controllers/serviceControllers.js";
import { auth } from "../middleware/auth.js";

const serviceRouter = express.Router();

serviceRouter.get("/", auth, listServices);

export default serviceRouter;
