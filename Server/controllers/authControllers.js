// Server / controllers / authControllers.js
import bcrypt from "bcrypt";
import { timeZone } from "../config/env.js";
import User from "../models/User.js";
import { slugify } from "../utils/slug.js";
import { verifyEmailOtp } from "../utils/emailOtp.js";
import {
  createToken,
  findUserByEmail,
  normalizedEmail,
  toUserResponse,
} from "../utils/auth.js";

/* -------- Register User -------- */
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      businessName,
      businessDescription,
      timezone,
      emailOtp,
    } = req.body;

    // if (!name || !email || !password) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Name, email and password are required.",
    //   });
    // }

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required.",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    if (password.length < 6 || password.length > 12) {
      return res.status(400).json({
        success: false,
        message: "Password must be between 6 and 12 characters.",
      });
    }

    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least one uppercase letter.",
      });
    }

    if (!/[a-z]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least one lowercase letter.",
      });
    }

    if (!/[0-9]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least one number.",
      });
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least one special character.",
      });
    }

    const normalizedEmailValue = normalizedEmail(email);
    const existingUser = await findUserByEmail(normalizedEmailValue);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const otpResult = await verifyEmailOtp({
      email: normalizedEmailValue,
      purpose: "registration",
      code: emailOtp,
      consume: true,
    });

    if (!otpResult.verified) {
      return res.status(400).json({
        success: false,
        message: otpResult.reason || "Email verification is required.",
      });
    }

    const baseSlug = slugify(businessName || name) || "business";
    let finalSlug = baseSlug;
    let counter = 1;

    while (await User.findOne({ slug: finalSlug })) {
      finalSlug = `${baseSlug}-${counter}`;
      counter += 1;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: normalizedEmailValue,
      password: hashPassword,
      slug: finalSlug,
      businessName: businessName || "",
      businessDescription: businessDescription || "",
      timeZone: timezone || timeZone,
    });

    const token = createToken(user._id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      token,
      user: toUserResponse(user),
    });
  } catch (error) {
    console.error(
      "Register User Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while registering the user.",
      error: `Register User Error: ${error?.stack || error?.message || error}`,
    });
  }
};
