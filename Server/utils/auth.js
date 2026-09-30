import jwt from "jsonwebtoken";
import {
  jwtSecret,
  jwtSecretExpiresIn,
  stripeSecretKey,
} from "../config/env.js";
import User from "../models/User.js";

/* -------- Converts an email address to lowercase and removes extra spaces. -------- */
export const normalizedEmail = (email = "") => {
  return email.toLowerCase().trim();
};

/* -------- Finds a user by their normalized email address. -------- */
export const findUserByEmail = async (email) => {
  const normalizedEmailValue = normalizedEmail(email);

  return User.findOne({ email: normalizedEmailValue });
};

/* -------- Creates a JWT token for the authenticated user. -------- */
export const createToken = (userId) => {
  return jwt.sign({ userId }, jwtSecret, {
    expiresIn: jwtSecretExpiresIn,
  });
};

/* -------- Returns safe user data for API responses without exposing sensitive fields. -------- */
export const toUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  slug: user.slug,
  businessName: user.businessName,
  businessDescription: user.businessDescription,
  brandTheme: user.brandTheme,
  brandAccent: user.brandAccent,
  timezone: user.timezone,
  googleCalendarConnected: user.googleCalendarConnected,
  googleCalendarId: user.googleCalendarId,
  payoutDetails: user.payoutDetails,
  stripeConfigured: Boolean(stripeSecretKey),
});
