// Server / utils / emailOtp.js
import bcrypt from "bcrypt";
import { maxOtpAttempts } from "../config/env.js";
import EmailOtp from "../models/EmailOtp.js";
import { normalizedEmail } from "./auth.js";

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
