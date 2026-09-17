// Client / src / services / admin / mutation.js
import { toast } from "react-toastify";
import { adminClient } from "../../api/admin";
import API_ROUTES from "../../api/api_route";

/* -------- Admin Login -------- */
export const adminLogin = async (payload) => {
  try {
    const { data } = await adminClient.post(API_ROUTES.ADMIN.LOGIN, payload);

    console.log("Admin Login API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Admin Login Success:", data?.message);
    } else {
      toast.warn(data?.message || "Admin login with warning");
      console.warn(
        "Admin Login Warning:",
        data?.message || "Admin Login Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Admin Login Error:", error);

    throw error;
  }
};
