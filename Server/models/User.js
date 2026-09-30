import mongoose from "mongoose";
import { timeZone } from "../config/env.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    businessName: {
      type: String,
      default: "",
      trim: true,
    },
    businessDescription: {
      type: String,
      default: "",
      trim: true,
    },
    brandTheme: {
      type: String,
      enum: ["green", "blue", "red", "orange", "gray"],
      default: "green",
    },
    brandAccent: {
      type: String,
      default: "#15803D",
    },
    timeZone: {
      type: String,
      default: timeZone,
    },
    googleRefreshToken: {
      type: String,
      default: "",
    },
    googleCalendarConnected: {
      type: Boolean,
      default: false,
    },
    googleCalendarId: {
      type: String,
      default: "primary",
    },
    payoutDetails: {
      accountHolderName: {
        type: String,
        default: "",
        trim: true,
      },
      bankName: {
        type: String,
        default: "",
        trim: true,
      },
      accountLast: {
        type: String,
        default: "",
      },
      ifsc: {
        type: String,
        default: "",
        trim: true,
        uppercase: true,
      },
      upiId: {
        type: String,
        default: "",
        trim: true,
      },
      isComplete: {
        type: Boolean,
        default: false,
      },
      updatedAt: {
        type: Date,
      },
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
