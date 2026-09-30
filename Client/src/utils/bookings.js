/* -------- Get banner variant -------- */
export const getBannerVariant = (msg) =>
  msg.toLowerCase().includes("triggered") ||
  msg.toLowerCase().includes("success")
    ? "bg-green-50 text-green-700 border-green-100"
    : "bg-[#F0FDFA] text-[#2DD4BF] border-[#CCFBF1]";

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
