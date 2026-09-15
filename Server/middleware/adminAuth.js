// Serve / middleware / adminAuth.js
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/env.js";

/* -------- Authenticate Admin with JWT Token -------- */
export const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Admin authorization required.",
    });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    req.admin = { email: decoded.email };

    next();
  } catch (error) {
    console.error(
      "Admin Authentication Error:",
      error?.stack || error?.message || error,
    );

    return res.status(401).json({
      success: false,
      message: "The authentication token is invalid or has expired.",
      error: error || error?.message || "Admin authentication failed.",
    });
  }
};
