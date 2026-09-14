// Server / utils / slug.js

/* -------- Converts a value into a URL-friendly slug. -------- */
export const slugify = (value) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};
