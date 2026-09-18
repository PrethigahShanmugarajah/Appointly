// Client / src / pages / DashboardPage / Services / DashboardPageServices.jsx
import {
  getMe,
  getPaymentOverview,
  listBookings,
  listServices,
} from "../../../services/fetch";

export const getDashboardUser = () => {
  return getMe();
};

export const getDashboardServices = () => {
  return listServices();
};

export const getDashboardBookings = () => {
  return listBookings();
};

export const getDashboardPaymentOverview = () => {
  return getPaymentOverview();
};
