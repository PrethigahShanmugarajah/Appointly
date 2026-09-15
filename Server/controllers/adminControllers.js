// Server / controllers / adminControllers.js
import { adminEmail, adminPassword, adminPasswordHash } from "../config/env.js";
import { createAdminToken, isAdminPasswordValid } from "../utils/admin.js";
import { normalizedEmail } from "../utils/auth.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Withdrawal from "../models/Withdrawal.js";
import { getAdminSummary } from "../services/adminService.js";

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

/* -------- Get Admin Dashboard -------- */
export const getAdminDashboard = async (req, res) => {
  try {
    const [users, summary, withdrawals, recentBookings] = await Promise.all([
      User.find()
        .select("name email businessName slug payoutDetails createdAt")
        .sort({ createdAt: -1 })
        .limit(100),
      getAdminSummary(),
      Withdrawal.find()
        .populate("userId", "name email businessName")
        .sort({ createdAt: -1 })
        .limit(50),
      Booking.find({ paymentStatus: "paid" })
        .populate("userId", "name email businessName")
        .populate("serviceId", "name")
        .sort({ updatedAt: -1 })
        .limit(10),
    ]);

    return res.status(200).json({
      success: true,
      message: "Admin dashboard data retrieved successfully.",
      summary,
      users,
      withdrawals,
      recentBookings,
    });
  } catch (error) {
    console.error(
      "Get Admin Dashboard Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while retrieving the admin dashboard.",
      error: `Get Admin Dashboard Error: ${error?.stack || error?.message || error}`,
    });
  }
};
