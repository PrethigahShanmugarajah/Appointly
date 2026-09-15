// Server / controllers / adminControllers.js
import { adminEmail, adminPassword, adminPasswordHash } from "../config/env.js";
import { createAdminToken, isAdminPasswordValid } from "../utils/admin.js";
import { normalizedEmail } from "../utils/auth.js";

/* -------- Admin Login -------- */
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const normalizedAdminEmail = normalizedEmail(adminEmail || "");

    // if (!normalizedAdminEmail || (!adminPassword && !adminPasswordHash)) {
    //   return res.status(503).json({
    //     success: false,
    //     message: "Admin login is not configured",
    //   });
    // }

    if (!normalizedAdminEmail) {
      return res.status(503).json({
        success: false,
        message: "Admin login is not configured",
      });
    }

    if (!adminPassword && !adminPasswordHash) {
      return res.status(503).json({
        success: false,
        message: "Admin login is not configured",
      });
    }

    // if (
    //   !email ||
    //   !password ||
    //   normalizedEmail(email) !== normalizedAdminEmail
    // ) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Invalid admin credentials",
    //   });
    // }

    if (!email) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    if (!password) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    if (normalizedEmail(email) !== normalizedAdminEmail) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    const passwordValid = await isAdminPasswordValid(password);

    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin login successful.",
      token: createAdminToken(normalizedAdminEmail),
      admin: { email: adminEmail },
    });
  } catch (error) {
    console.error(
      "Admin Login Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while processing the admin login.",
      error: `Admin Login Error: ${error?.stack || error?.message || error}`,
    });
  }
};
