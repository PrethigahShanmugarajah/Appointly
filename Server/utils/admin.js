import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  adminPassword,
  adminPasswordHash,
  jwtSecret,
  jwtSecretExpiresIn,
} from "../config/env.js";

/* -------- Create Admin Token -------- */
export const createAdminToken = (email) => {
  return jwt.sign({ email, role: "admin" }, jwtSecret, {
    expiresIn: jwtSecretExpiresIn,
  });
};

/* -------- Validate Admin Password -------- */
export const isAdminPasswordValid = async (password) => {
  if (adminPasswordHash) {
    return bcrypt.compare(password, adminPasswordHash);
  }

  return password === adminPassword;
};

/* -------- Sum Rows By Key -------- */
export const sumByKey = (rows) =>
  rows.reduce((acc, row) => ({ ...acc, [row._id]: row.total }), {});

/* -------- Terminal Withdrawal Status -------- */
export const terminalWithdrawalStatus = ["paid", "rejected"];
