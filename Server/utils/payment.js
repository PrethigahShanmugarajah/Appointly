// Server / utils / payment.js
import mongoose from "mongoose";

/* -------- Convert ID to ObjectId -------- */
export const toObjectId = (id) => new mongoose.Types.ObjectId(String(id));
