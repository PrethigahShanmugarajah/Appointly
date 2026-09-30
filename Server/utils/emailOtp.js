import bcrypt from "bcrypt";
import crypto from "crypto";
import { maxOtpAttempts, otpTtlMinutes } from "../config/env.js";
import EmailOtp from "../models/EmailOtp.js";
import { normalizedEmail } from "./auth.js";
import { sendOtpNotification } from "./bookingNotifications.js";

/* -------- Generates a random six-digit OTP code. -------- */
const createCode = () => crypto.randomInt(100000, 1000000).toString();

/* -------- Creates, stores, and sends an email OTP for verification. -------- */
export const requestEmailOtp = async ({ email, purpose }) => {
  const normalizedEmailValue = normalizedEmail(email);
  if (!normalizedEmailValue) {
    throw new Error("Email is required.");
  }

  const code = createCode();
  const codeHash = await bcrypt.hash(code, 10);
  const expireAt = new Date(Date.now() + otpTtlMinutes * 60 * 1000);

  await EmailOtp.deleteMany({
    email: normalizedEmailValue,
    purpose,
    consumeAt: null,
  });

  await EmailOtp.create({
    email: normalizedEmailValue,
    purpose,
    codeHash,
    expireAt,
  });

  await sendOtpNotification({ email: normalizedEmailValue, code, purpose });

  return {
    sent: true,
    email: normalizedEmailValue,
    expiresInMinutes: otpTtlMinutes,
  };
};

/* -------- Verifies an email OTP and optionally marks it as consumed. -------- */
export const verifyEmailOtp = async ({
  email,
  purpose,
  code,
  consume = false,
}) => {
  const normalizedEmailValue = normalizedEmail(email);

  if (!normalizedEmailValue || !code) {
    return { verified: false, reason: "Email and OTP are required." };
  }

  const record = await EmailOtp.findOne({
    email: normalizedEmailValue,
    purpose,
    consumeAt: null,
    expireAt: { $gt: new Date() },
  }).sort({ createdAt: -1 });

  if (!record) {
    return { verified: false, reason: "OTP expired or not found." };
  }

  if (record.attempts >= maxOtpAttempts) {
    return {
      verified: false,
      reason: "Too many OTP attempts. Requested a new code.",
    };
  }

  const isMatch = await bcrypt.compare(String(code).trim(), record.codeHash);
  if (!isMatch) {
    record.attempts += 1;
    await record.save();
    return { verified: false, reason: "Invalid OTP" };
  }

  if (consume) {
    record.consumeAt = new Date();
    await record.save();
  }

  return { verified: true, email: normalizedEmailValue };
};
