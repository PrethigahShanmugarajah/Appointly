// Server / routes / adminRoutes.js
import express from "express";
import {
  getAdminDashboard,
  loginAdmin,
} from "../controllers/adminControllers.js";
import { adminAuth } from "../middleware/adminAuth.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.get("/dashboard", adminAuth, getAdminDashboard);

export default adminRouter;
