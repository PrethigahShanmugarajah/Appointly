// Server / utils / time.js

/* -------- Convert Time to Minutes -------- */
export const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

/* -------- Validate Time Range -------- */
export const isValidTimeRange = (startTime, endTime) => {
  return timeToMinutes(startTime) < timeToMinutes(endTime);
};
