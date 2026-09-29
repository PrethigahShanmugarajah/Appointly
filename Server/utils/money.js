// Server / utils / money.js
import { currencyCode, locale, platformFeeRate } from "../config/env.js";

/* -------- Calculate Platform Split -------- */
export const calculatePlatformSplit = (amount) => {
  const safeAmount = Number.isFinite(amount)
    ? Math.max(0, Math.round(amount))
    : 0;
  const platformFeeAmount = Math.round(safeAmount * platformFeeRate);
  const providerPayoutAmount = Math.max(0, safeAmount - platformFeeAmount);

  return { platformFeeAmount, providerPayoutAmount };
};

/* -------- Format Minor Money -------- */
export const formatMinorMoney = (amount, currency = currencyCode) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format((amount || 0) / 100);
};
