// Server / routes / serviceRoutes.js
import express from "express";
import {
  createService,
  deleteService,
  listServices,
  updateService,
} from "../controllers/serviceControllers.js";
import { auth } from "../middleware/auth.js";

const serviceRouter = express.Router();

serviceRouter.get("/", auth, listServices);
serviceRouter.post("/", auth, createService);
serviceRouter.put("/:id", auth, updateService);
serviceRouter.delete("/:id", auth, deleteService);

export default serviceRouter;
