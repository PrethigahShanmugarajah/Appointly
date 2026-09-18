// Client / src / pages / Admin / AdminDashboardPage / Services / AdminDashboardPageServices.jsx
import { updateWithdrawalStatus } from "../../../../services/mutation";
import { getAdminDashboard } from "../../../../services/fetch";

export const fetchAdminDashboard = () => {
  return getAdminDashboard();
};

export const changeAdminWithdrawalStatus = (withdrawalId, status) => {
  return updateWithdrawalStatus(withdrawalId, { status });
};
