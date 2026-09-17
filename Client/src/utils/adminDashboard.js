// Client / src / utils / adminDashboard.js

/* -------- Withdrawal Statuses -------- */
export const withdrawalStatuses = ["processing", "paid", "rejected"];

/* -------- Terminal Withdrawal Statuses -------- */
export const terminalWithdrawalStatuses = ["paid", "rejected"];

/* -------- Check Terminal Withdrawal Status -------- */
export const isTerminalWithdrawalStatus = (status) =>
  terminalWithdrawalStatuses.includes(status);

/* -------- Format Withdrawal Status Label -------- */
export const formatStatusLabel = (status = "") =>
  status ? `${status.slice(0, 1).toUpperCase()}${status.slice(1)}` : "";
