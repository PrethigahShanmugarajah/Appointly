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

/* -------- Cancel Public Booking Payment -------- */
export const cancelPublicBookingPayments = async (bookingId) => {
  try {
    const { data } = await client.post(API_ROUTES.PUBLIC.CANCEL_PAYMENT, {
      booking_id: bookingId,
    });

    console.log("Cancel Public Booking Payment API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Cancel Public Booking Payment Success:", data?.message);
    } else {
      toast.warn(
        data?.message || "Public booking payment cancellation with warning",
      );
      console.warn(
        "Cancel Public Booking Payment Warning:",
        data?.message || "Public booking payment cancellation with warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Cancel Public Booking Payment Error:", error);

    throw error;
  }
};

/* -------- Save Availability -------- */
export const saveAvailability = async (payload) => {
  try {
    const { data } = await client.post(API_ROUTES.AVAILABILITY.BASE, payload);

    console.log("Save Availability API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Save Availability Success:", data?.message);
    } else {
      toast.warn(data?.message || "Availability save with warning");
      console.warn(
        "Save Availability Warning:",
        data?.message || "Availability save with warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Save Availability Error:", error);

    throw error;
  }
};

/* -------- Update Service -------- */
export const updateService = async (id, payload) => {
  try {
    const { data } = await client.put(
      `${API_ROUTES.SERVICE.BASE}/${id}`,
      payload,
    );

    console.log("Update Service API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Update Service Success:", data?.message);
    } else {
      toast.warn(data?.message || "Service update with warning");
      console.warn(
        "Update Service Warning:",
        data?.message || "Service update with warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Update Service Error:", error);

    throw error;
  }
};

/* -------- Create Service -------- */
export const createService = async (payload) => {
  try {
    const { data } = await client.post(API_ROUTES.SERVICE.BASE, payload);

    console.log("Create Service API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Create Service Success:", data?.message);
    } else {
      toast.warn(data?.message || "Service creation with warning");
      console.warn(
        "Create Service Warning:",
        data?.message || "Service creation with warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Create Service Error:", error);

    throw error;
  }
};

/* -------- Delete Service -------- */
export const deleteService = async (id) => {
  try {
    const { data } = await client.delete(`${API_ROUTES.SERVICE.BASE}/${id}`);

    console.log("Delete Service API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Delete Service Success:", data?.message);
    } else {
      toast.warn(data?.message || "Service deletion with warning");
      console.warn(
        "Delete Service Warning:",
        data?.message || "Service deletion with warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Delete Service Error:", error);

    throw error;
  }
};

/* -------- Request Withdrawal -------- */
export const requestWithdrawal = async (amount) => {
  try {
    const { data } = await client.post(API_ROUTES.PAYMENT.WITHDRAWALS, {
      amount,
    });

    console.log("Request Withdrawal API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Request Withdrawal Success:", data?.message);
    } else {
      toast.warn(data?.message || "Withdrawal request with warning");
      console.warn(
        "Request Withdrawal Warning:",
        data?.message || "Withdrawal request with warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Request Withdrawal Error:", error);

    throw error;
  }
};

/* -------- Update Payout Details -------- */
export const updatePayoutDetails = async (payload) => {
  try {
    const { data } = await client.put(
      API_ROUTES.PAYMENT.PAYOUT_DETAILS,
      payload,
    );

    console.log("Update Payout Details API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Update Payout Details Success:", data?.message);
    } else {
      toast.warn(data?.message || "Payout details update with warning");
      console.warn(
        "Update Payout Details Warning:",
        data?.message || "Payout details update with warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Update Payout Details Error:", error);

    throw error;
  }
};
