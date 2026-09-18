// Client / src / services / fetch.js
import { toast } from "react-toastify";
import { adminClient } from "../api/admin";
import API_ROUTES from "../api/api_route";

/* -------- Fetch Admin Dashboard -------- */
export const getAdminDashboard = async () => {
  try {
    const { data } = await adminClient.get(API_ROUTES.ADMIN.DASHBOARD);

    console.log("Admin Dashboard API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Admin Dashboard Success:", data?.message);
    } else {
      toast.warn(data?.message || "Admin dashboard with warning");
      console.warn(
        "Admin Dashboard Warning:",
        data?.message || "Admin Dashboard Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Admin Dashboard Error:", error);

    throw error;
  }
};
