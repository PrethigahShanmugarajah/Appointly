// Client / src / services / fetch.js
import { toast } from "react-toastify";
import { adminClient } from "../api/admin";
import API_ROUTES from "../api/api_route";
import { client } from "../api/client";

/* -------- Fetch Admin Dashboard -------- */
export const getAdminDashboard = async () => {
  try {
    const { data } = await adminClient.get(API_ROUTES.ADMIN.DASHBOARD);

    console.log("Admin Dashboard API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
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

/* -------- Fetch Current User -------- */
export const getMe = async () => {
  try {
    const { data } = await client.get(API_ROUTES.AUTH.GET_ME);

    console.log("Get Me API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Get Me Success:", data?.message);
    } else {
      toast.warn(data?.message || "Get current user with warning");
      console.warn("Get Me Warning:", data?.message || "Get Me Warning");
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Get Me Error:", error);

    throw error;
  }
};

/* -------- Fetch Bookings -------- */
export const listBookings = async (params = {}) => {
  try {
    const { data } = await client.get(API_ROUTES.BOOKING.BASE, { params });

    console.log("Bookings API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Bookings Success:", data?.message);
    } else {
      toast.warn(data?.message || "Bookings with warning");
      console.warn("Bookings Warning:", data?.message || "Bookings Warning");
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Bookings Error:", error);

    throw error;
  }
};

/* -------- Fetch Payment Overview -------- */
export const getPaymentOverview = async () => {
  try {
    const { data } = await client.get(API_ROUTES.PAYMENT.BASE);

    console.log("Payment Overview API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Payment Overview Success:", data?.message);
    } else {
      toast.warn(data?.message || "Payment overview with warning");
      console.warn(
        "Payment Overview Warning:",
        data?.message || "Payment Overview Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Payment Overview Error:", error);

    throw error;
  }
};

/* -------- Fetch Services -------- */
export const listServices = async () => {
  try {
    const { data } = await client.get(API_ROUTES.SERVICE.BASE);

    console.log("Services API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Services Success:", data?.message);
    } else {
      toast.warn(data?.message || "Services with warning");
      console.warn("Services Warning:", data?.message || "Services Warning");
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Services Error:", error);

    throw error;
  }
};

/* -------- Fetch Google Connect URL -------- */
export const getGoogleConnectUrl = async () => {
  try {
    const { data } = await client.get(API_ROUTES.INTEGRATION.GOOGLE_CONNECT);

    console.log("Google Connect URL API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Google Connect URL Success:", data?.message);
    } else {
      toast.warn(data?.message || "Google Connect URL with warning");
      console.warn(
        "Google Connect URL Warning:",
        data?.message || "Google Connect URL with warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Google Connect URL Error:", error);

    throw error;
  }
};

/* -------- Fetch Public Booking Status -------- */
export const getPublicBookingStatus = async (params = {}) => {
  try {
    const { data } = await client.get(API_ROUTES.PUBLIC.BOOKING_STATUS, {
      params,
    });

    console.log("Public Booking Status API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Public Booking Status Success:", data?.message);
    } else {
      toast.warn(data?.message || "Public booking status with warning");
      console.warn(
        "Public Booking Status Warning:",
        data?.message || "Public booking status warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Public Booking Status Error:", error);

    throw error;
  }
};
