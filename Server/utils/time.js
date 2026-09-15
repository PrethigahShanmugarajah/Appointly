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

/* -------- Get Day of Week -------- */
export const getDayOfWeek = (date) => {
  return new Date(`${date}T00:00:00`).getDay();
};

/* -------- Convert Minutes to Time -------- */
export const minutesToTime = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

/* -------- Get Booking Hold Window Start -------- */
export const holdWindowStart = () => {
  return new Date(Date.now() - 30 * 60 * 1000);
};
