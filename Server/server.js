// Server / server.js
import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { port } from "./config/env.js";

/* -------- INITIALIZE EXPRESS -------- */
const app = express();

/* -------- CONNECT TO DATABASE -------- */

/* -------- MIDDLEWARE CONFIGURATION -------- */
app.use(cors());
app.use(express.json());

/* -------- ROUTES -------- */
app.get("/", (req, res) => res.send("API is Working!"));

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
