// Client / src / services / mutation.js
import { toast } from "react-toastify";
import { adminClient } from "../api/admin";
import API_ROUTES from "../api/api_route";
import { client } from "../api/client";

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

/* -------- Update Withdrawal Status -------- */
export const updateWithdrawalStatus = async (id, payload) => {
  try {
    const { data } = await adminClient.patch(
      API_ROUTES.ADMIN.UPDATE_WITHDRAWAL(id),
      payload,
    );

    console.log("Update Withdrawal Status API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Update Withdrawal Status Success:", data?.message);
    } else {
      toast.warn(data?.message || "Withdrawal status update with warning");
      console.warn(
        "Update Withdrawal Status Warning:",
        data?.message || "Withdrawal status update with warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Update Withdrawal Status Error:", error);

    throw error;
  }
};

/* -------- Verify Registration OTP -------- */
export const verifyRegistrationOtp = async (payload) => {
  try {
    const { data } = await client.post(API_ROUTES.AUTH.VERIFY_OTP, payload);

    console.log("Verify Registration OTP API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Verify Registration OTP Success:", data?.message);
    } else {
      toast.warn(data?.message || "OTP verification with warning");
      console.warn(
        "Verify Registration OTP Warning:",
        data?.message || "OTP verification with warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Verify Registration OTP Error:", error);

    throw error;
  }
};

/* -------- Request Registration OTP -------- */
export const requestRegistrationOtp = async (email) => {
  try {
    const { data } = await client.post(API_ROUTES.AUTH.REQUEST_OTP, { email });

    console.log("Request Registration OTP API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Request Registration OTP Success:", data?.message);
    } else {
      toast.warn(data?.message || "OTP request with warning");
      console.warn(
        "Request Registration OTP Warning:",
        data?.message || "OTP request with warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Request Registration OTP Error:", error);

    throw error;
  }
};

/* -------- Register User -------- */
export const register = async (payload) => {
  try {
    const { data } = await client.post(API_ROUTES.AUTH.REGISTER, payload);

    console.log("Register API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Register Success:", data?.message);
    } else {
      toast.warn(data?.message || "Registration with warning");
      console.warn(
        "Register Warning:",
        data?.message || "Registration with warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Register Error:", error);

    throw error;
  }
};

/* -------- User Login -------- */
export const login = async (payload) => {
  try {
    const { data } = await client.post(API_ROUTES.AUTH.LOGIN, payload);

    console.log("User Login API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("User Login Success:", data?.message);
    } else {
      toast.warn(data?.message || "User login with warning");
      console.warn(
        "User Login Warning:",
        data?.message || "User login with warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("User Login Error:", error);

    throw error;
  }
};

/* -------- Update Profile -------- */
export const updateProfile = async (payload) => {
  try {
    const { data } = await client.put(API_ROUTES.AUTH.UPDATE_PROFILE, payload);

    console.log("Update Profile API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Update Profile Success:", data?.message);
    } else {
      toast.warn(data?.message || "Profile update with warning");
      console.warn(
        "Update Profile Warning:",
        data?.message || "Profile update with warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Update Profile Error:", error);

    throw error;
  }
};

/* -------- Reschedule Booking -------- */
export const rescheduleBooking = async (id, payload) => {
  try {
    const { data } = await client.patch(
      API_ROUTES.BOOKING.RESCHEDULE(id),
      payload,
    );

    console.log("Reschedule Booking API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Reschedule Booking Success:", data?.message);
    } else {
      toast.warn(data?.message || "Booking reschedule with warning");
      console.warn(
        "Reschedule Booking Warning:",
        data?.message || "Booking reschedule with warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Reschedule Booking Error:", error);

    throw error;
  }
};

/* -------- Update Booking Status -------- */
export const updateBookingStatus = async (id, status) => {
  try {
    const { data } = await client.patch(API_ROUTES.BOOKING.UPDATE_STATUS(id), {
      status,
    });

    console.log("Update Booking Status API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Update Booking Status Success:", data?.message);
    } else {
      toast.warn(data?.message || "Booking status update with warning");
      console.warn(
        "Update Booking Status Warning:",
        data?.message || "Booking status update with warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Update Booking Status Error:", error);

    throw error;
  }
};
