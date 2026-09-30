import Stripe from "stripe";
import { stripeSecretKey } from "../config/env.js";

/* -------- Get Stripe Client -------- */
export const getStripe = () => {
  if (!stripeSecretKey) {
    return null;
  }

  return new Stripe(stripeSecretKey);
};

/* -------- Convert Amount to Stripe Format -------- */
export const toStripeAmount = (price) => {
  return Math.round(Number(price || 0) * 100);
};
