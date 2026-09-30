/* -------- Get Calendar Message -------- */
export const getCalendarMessage = (value) => {
  if (value === "connected") return "Google Calendar connected successfully.";
  if (value) return "Google Calendar connection was not completed";
  return "";
};

/* -------- Get Message Banner Class -------- */
export const getMessageBannerClass = (msg) => {
  if (!msg) return "";

  return msg.toLowerCase().includes("success") || msg.includes("updated")
    ? "bg-green-50 text-green-700 border-green-100"
    : "bg-red-50 text-red-700 border-red-100";
};

/* -------- Get Public Booking Link -------- */
export const getPublicBookingLink = (slug) => {
  return slug
    ? `${window.location.origin}/book/${slug}`
    : `${window.location.origin}`;
};
