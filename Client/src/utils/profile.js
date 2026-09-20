// Client / src / utils / profile.js

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
    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
    : "bg-rose-50 text-rose-700 border-rose-100";
};

/* -------- Get Public Booking Link -------- */
export const getPublicBookingLink = (slug) => {
  return slug
    ? `${window.location.origin}/book/${slug}`
    : `${window.location.origin}`;
};
