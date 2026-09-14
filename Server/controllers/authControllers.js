// Server / controllers / authControllers.js
import bcrypt from "bcrypt";
import { timeZone } from "../config/env.js";
import User from "../models/User.js";
import { slugify } from "../utils/slug.js";
import { requestEmailOtp, verifyEmailOtp } from "../utils/emailOtp.js";
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

/* -------- Request Registration OTP -------- */
export const requestRegistrationOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const normalizedEmailValue = normalizedEmail(email);

    if (!normalizedEmailValue) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const existingUser = await findUserByEmail(normalizedEmailValue);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const result = await requestEmailOtp({
      email: normalizedEmailValue,
      purpose: "registration",
    });

    return res.status(200).json({
      success: true,
      message: "Registration OTP sent successfully.",
      result,
    });
  } catch (error) {
    console.error(
      "Request Registration OTP Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while sending the registration OTP.",
      error: `Request Registration OTP Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Verify Registration OTP -------- */
export const verifyRegistrationOTP = async (req, res) => {
  try {
    const { email, emailOtp } = req.body;

    const normalizedEmailValue = normalizedEmail(email);

    // if (!normalizedEmailValue || !emailOtp) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Email and OTP are required.",
    //   });
    // }

    if (!normalizedEmailValue) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!emailOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required.",
      });
    }

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
      consume: false,
    });

    if (!otpResult.verified) {
      return res.status(400).json({
        success: false,
        message: otpResult.reason || "Invalid OTP.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Registration OTP verified successfully.",
    });
  } catch (error) {
    console.error(
      "Verify Registration OTP Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while verifying the registration OTP.",
      error: `Verify Registration OTP Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Login User -------- */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const normalizedEmailValue = normalizedEmail(email);

    // if (!email || !password) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Email and password are required.",
    //   });
    // }

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

    const user = await findUserByEmail(normalizedEmailValue);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "The email or password you entered is incorrect.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "The email or password you entered is incorrect.",
      });
    }

    const token = createToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: toUserResponse(user),
    });
  } catch (error) {
    console.error("Login User Error:", error?.stack || error?.message || error);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while logging in.",
      error: `Login User Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Get Current User -------- */
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User details retrieved successfully.",
      user: toUserResponse(user),
    });
  } catch (error) {
    console.error("Get Current User:", error?.stack || error?.message || error);

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while retrieving your account details.",
      error: `Get Current User: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Update User -------- */
export const updateProfile = async (req, res) => {
  try {
    const {
      businessName,
      businessDescription,
      timezone,
      brandTheme,
      brandAccent,
    } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (businessName !== undefined) user.businessName = businessName;
    if (businessDescription !== undefined)
      user.businessDescription = businessDescription;
    if (timezone !== undefined) user.timeZone = timezone;
    if (brandTheme !== undefined) user.brandTheme = brandTheme;
    if (brandAccent !== undefined) user.brandAccent = brandAccent;

    const baseSlug = slugify(user.businessName || user.name) || "business";
    let finalSlug = baseSlug;
    let counter = 1;

    while (await User.findOne({ slug: finalSlug, _id: { $ne: user._id } })) {
      finalSlug = `${baseSlug}-${counter}`;
      counter += 1;
    }

    user.slug = finalSlug;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: toUserResponse(user),
    });
  } catch (error) {
    console.error(
      "Update User Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while updating your profile.",
      error: `Update User Error: ${error?.stack || error?.message || error}`,
    });
  }
};
