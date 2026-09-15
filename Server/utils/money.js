// Server / utils / money.js
import { platformFeeRate } from "../config/env.js";

/* -------- Calculate Platform Split -------- */
export const calculatePlatformSplit = (amount) => {
  const safeAmount = Number.isFinite(amount)
    ? Math.max(0, Math.round(amount))
    : 0;
  const platformFeeAmount = Math.round(safeAmount * platformFeeRate);
  const providerPayoutAmount = Math.max(0, safeAmount - platformFeeAmount);

  return { platformFeeAmount, providerPayoutAmount };
};
