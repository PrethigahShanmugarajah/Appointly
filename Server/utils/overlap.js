import { timeToMinutes } from "./time.js";

/* -------- Check Time Overlap -------- */
export const timeOverlap = (firstStart, firstEnd, secondStart, secondEnd) => {
  return (
    timeToMinutes(firstStart) < timeToMinutes(secondEnd) &&
    timeToMinutes(firstEnd) > timeToMinutes(secondStart)
  );
};
