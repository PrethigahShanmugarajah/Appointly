/* -------- Format timestamp -------- */
export const formatTimestamp = (value, locale) => {
  if (!value) return "Not available";
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

/* -------- Format 24-hour time -------- */
export const formatTime = (time24) => {
  if (!time24) return "";
  const [h, m] = time24.split(":");
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${String(displayHour).padStart(2, "0")}:${m} ${ampm}`;
};

/* -------- Get today's date -------- */
export const today = new Date(
  Date.now() - new Date().getTimezoneOffset() * 60000,
)
  .toISOString()
  .slice(0, 10);
