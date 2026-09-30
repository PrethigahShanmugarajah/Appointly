import mongoose from "mongoose";

/* -------- Convert ID to ObjectId -------- */
export const toObjectId = (id) => new mongoose.Types.ObjectId(String(id));

/* -------- Mask Account Number -------- */
export const maskAccountNumber = (accountNumber = "") => {
  const digits = String(accountNumber).replace(/\D/g, "");

  return digits.slice(-4);
};
