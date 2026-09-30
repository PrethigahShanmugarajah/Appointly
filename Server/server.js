import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { port } from "./config/env.js";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import serviceRouter from "./routes/serviceRoutes.js";
import availabilityRouter from "./routes/availabilityRoutes.js";
import integrationRouter from "./routes/integrationRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import publicRouter from "./routes/publicRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

/* -------- INITIALIZE EXPRESS -------- */
const app = express();

/* -------- CONNECT TO DATABASE -------- */
connectDB();

/* -------- MIDDLEWARE CONFIGURATION -------- */
app.use(cors());
app.use(express.json());

/* -------- ROUTES -------- */
app.get("/", (req, res) => res.send("API is Working!"));
app.use("/api/auth", authRouter);
app.use("/api/services", serviceRouter);
app.use("/api/availability", availabilityRouter);
app.use("/api/integrations", integrationRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/public", publicRouter);
app.use("/public", publicRouter);
app.use("/api/admin", adminRouter);

/* -------- PORT -------- */
const server = http.createServer(app);

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `Port ${port} is already in use. Please choose a different port.`,
    );
    process.exit(1);
  }

  throw error;
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
