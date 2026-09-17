// Client / src / pages / Admin / AdminDashboardPage / Services / AdminDashboardPageServices.jsx
import { updateWithdrawalStatus } from "../../../../services/admin/mutation";
import { getAdminDashboard } from "../../../../services/admin/fetch";

export const fetchAdminDashboard = () => {
  return getAdminDashboard();
};

export const changeAdminWithdrawalStatus = (withdrawalId, status) => {
  return updateWithdrawalStatus(withdrawalId, { status });
};
