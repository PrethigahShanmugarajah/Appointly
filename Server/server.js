// Server / server.js
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
