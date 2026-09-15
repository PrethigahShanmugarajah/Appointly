// Server / controllers / paymentControllers.js
import User from "../models/User.js";
import WalletTransaction from "../models/WalletTransaction.js";
import Withdrawal from "../models/Withdrawal.js";
import { maskAccountNumber, toObjectId } from "../utils/payment.js";
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

/* -------- Update Payout Details -------- */
export const updatePayoutDetails = async (req, res) => {
  try {
    const { accountHolderName, bankName, accountNumber, ifsc, upiId } =
      req.body;

    // if (!accountHolderName || (!accountNumber && !upiId)) {
    //   return res.status(400).json({
    //     message:
    //       "Account holder name and either a bank account number or UPI ID are required.",
    //   });
    // }

    if (!accountHolderName) {
      return res.status(400).json({
        message: "Account holder name is required.",
      });
    }

    if (!accountNumber && !upiId) {
      return res.status(400).json({
        message: "Either a bank account number or UPI ID is required.",
      });
    }

    const payoutDetails = {
      accountHolderName,
      bankName: bankName || "",
      accountLast: accountNumber ? maskAccountNumber(accountNumber) : "",
      ifsc: ifsc || "",
      upiId: upiId || "",
      isComplete: Boolean(accountHolderName && (accountNumber || upiId)),
      updatedAt: new Date(),
    };

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { payoutDetails },
      { new: true },
    ).select("payoutDetails");

    return res.status(200).json({
      success: true,
      message: "Payout details updated successfully.",
      payoutDetails: user.payoutDetails,
    });
  } catch (error) {
    console.error(
      "Update Payout Details Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while updating the payout details.",
      error: `Update Payout Details Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Request Withdrawal -------- */
export const requestWithdrawal = async (req, res) => {
  try {
    const userId = toObjectId(req.user.id);
    const amount = Math.round(Number(req.body.amount || 0));
    const user = await User.findById(userId).select("payoutDetails");

    if (!user?.payoutDetails?.isComplete) {
      return res.status(400).json({
        success: false,
        message: "Add payout details before requesting a withdrawal",
      });
    }

    const summary = await getWalletSummary(userId);
    if (!amount || amount < 100) {
      return res.status(400).json({
        success: false,
        message: "Withdrawal amount must be at least 100 cents.",
      });
    }

    if (amount > summary.available) {
      return res.status(400).json({
        success: false,
        message: "Withdrawal amount exceeds available balance",
      });
    }

    const withdrawal = await Withdrawal.create({
      userId,
      amount,
      payoutSnapshot: user.payoutDetails,
    });

    await WalletTransaction.create({
      userId,
      withdrawalId: withdrawal._id,
      type: "withdrawal_hold",
      amount,
      status: "pending",
      description: "Withdrawal requested",
    });

    return res.status(201).json({
      success: true,
      message: "Withdrawal request submitted successfully.",
      withdrawal,
    });
  } catch (error) {
    console.error(
      "Request Withdrawal Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while processing the withdrawal request.",
      error: `Request Withdrawal Error: ${error?.stack || error?.message || error}`,
    });
  }
};
