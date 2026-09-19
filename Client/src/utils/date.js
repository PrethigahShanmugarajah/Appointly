// Client / src / utils / date.js

/* -------- Format timestamp -------- */
export const formatTimestamp = (value, locale) => {
  if (!value) return "Not available";
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};
