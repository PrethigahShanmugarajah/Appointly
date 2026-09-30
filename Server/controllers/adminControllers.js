import { adminEmail, adminPassword, adminPasswordHash } from "../config/env.js";
import {
  createAdminToken,
  isAdminPasswordValid,
  terminalWithdrawalStatus,
} from "../utils/admin.js";
import { normalizedEmail } from "../utils/auth.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Withdrawal from "../models/Withdrawal.js";
import { getAdminSummary } from "../services/adminService.js";
import mongoose from "mongoose";
import WalletTransaction from "../models/WalletTransaction.js";

/* -------- Admin Login -------- */
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const normalizedAdminEmail = normalizedEmail(adminEmail || "");

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

/* -------- Update Withdrawal Status -------- */
export const updateWithdrawalStatus = async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const allowedStatuses = ["pending", "processing", "paid", "rejected"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid withdrawal status.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid withdrawal ID.",
      });
    }

    const withdrawal = await Withdrawal.findById(req.params.id);
    if (!withdrawal) {
      return res.status(404).json({
        success: false,
        message: "Withdrawal not found.",
      });
    }

    if (terminalWithdrawalStatus.includes(withdrawal.status)) {
      return res.status(400).json({
        success: false,
        message: `Withdrawal is already ${withdrawal.status} and cannot be changed.`,
      });
    }

    if (status === "rejected" && withdrawal.status !== "rejected") {
      const existingReversal = await WalletTransaction.findOne({
        withdrawalId: withdrawal._id,
        type: "withdrawal_reversal",
      });

      if (!existingReversal) {
        await WalletTransaction.create({
          userId: withdrawal.userId,
          withdrawalId: withdrawal._id,
          type: "withdrawal_reversal",
          amount: withdrawal.amount,
          status: "reversed",
          description: "Withdrawal rejected and funds returned",
        });
      }
    }

    withdrawal.status = status;
    withdrawal.adminNote = adminNote || withdrawal.adminNote;
    await withdrawal.save();
    const [summary] = await Promise.all([
      getAdminSummary(),
      withdrawal.populate("userId", "name email businessName"),
    ]);

    return res.status(200).json({
      success: true,
      message: `Withdrawal status updated to ${status}.`,
      withdrawal,
      summary,
    });
  } catch (error) {
    console.error(
      "Update Withdrawal Status Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while updating the withdrawal status.",
      error: `Update Withdrawal Status Error: ${error?.stack || error?.message || error}`,
    });
  }
};
