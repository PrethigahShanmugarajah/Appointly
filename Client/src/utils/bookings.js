// Client / src / utils / bookings.js

/* -------- Get banner variant -------- */
export const getBannerVariant = (msg) =>
  msg.toLowerCase().includes("triggered") ||
  msg.toLowerCase().includes("success")
    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
    : "bg-[#F4F0FF] text-[#7D57F5] border-[#EBE4FF]";

/* -------- Booking statuses -------- */
export const statuses = ["", "Confirmed", "Rescheduled", "Cancelled"];

/* -------- Get booking status options -------- */
export const getStatusOptions = () =>
  statuses.map((status) => ({
    value: status,
    label: status ? status.replace("_", "") : "All Statuses",
  }));

/* -------- Format booking status -------- */
export const formatBookingStatus = (status) =>
  status ? status.replace("_", " ") : "Not available";
