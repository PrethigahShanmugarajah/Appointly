/* -------- Get transaction label -------- */
export const transactionLabel = (transaction) => {
  if (transaction.type === "booking_payment") {
    if (
      transaction.description &&
      transaction.description.includes("Booking payout Stripe session")
    ) {
      return "Booking payment received.";
    }

    return transaction.description || "Booking payout";
  }

  if (transaction.type === "withdrawal_hold") return "Withdrawal requested";
  if (transaction.type === "withdrawal_reversal") return "Withdrawal returned";
  if (
    transaction.description &&
    transaction.description.includes("Booking payout for the stripe session")
  ) {
    return "Booking payment received.";
  }

  return transaction.description || transaction.type;
};

/* -------- Get transaction amount -------- */
export const transactionAmount = (transaction) => {
  if (transaction.type === "withdrawal_hold")
    return Math.abs(transaction.amount || 0);
  return transaction.amount || 0;
};

/* -------- Format amount -------- */
export const formatAmount = (amount = 0) => (amount / 100).toFixed(2);
