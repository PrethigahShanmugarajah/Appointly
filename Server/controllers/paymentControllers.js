// Server / controllers / paymentControllers.js
import User from "../models/User.js";
import WalletTransaction from "../models/WalletTransaction.js";
import Withdrawal from "../models/Withdrawal.js";
import { toObjectId } from "../utils/payment.js";
import { getWalletSummary } from "../utils/wallet.js";

/* -------- Get Payment Overview -------- */
export const getPaymentOverview = async (req, res) => {
  try {
    const userId = toObjectId(req.user.id);

    const [user, summary, transactions, withdrawals] = await Promise.all([
      User.findById(userId).select("payoutDetails"),
      getWalletSummary(userId),
      WalletTransaction.find({ userId }).sort({ createdAt: -1 }).limit(15),
      Withdrawal.find({ userId }).sort({ createdAt: -1 }).limit(10),
    ]);

    return res.status(200).json({
      success: true,
      message: "Payment overview retrieved successfully.",
      payoutDetails: user?.payoutDetails || {},
      wallet: summary,
      transactions,
      withdrawals,
    });
  } catch (error) {
    console.error(
      "Get Payment Overview Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while retrieving the payment overview.",
      error: `Get Payment Overview Error: ${error?.stack || error?.message || error}`,
    });
  }
};
