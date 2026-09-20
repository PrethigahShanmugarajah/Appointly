// Client / src / utils / availability.js

/* -------- Default availability slot -------- */
export const defaultSlot = { startTime: "09:00", endTime: "17:00" };

/* -------- Get slots for day -------- */
export const getSlotsForDays = (items, day) => {
  const dayAvailability = items.find((item) => item.dayOfWeek === day);

  return dayAvailability?.slots?.length ? dayAvailability.slots : [defaultSlot];
};

/* -------- Days of week -------- */
export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
