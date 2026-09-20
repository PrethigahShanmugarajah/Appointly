// Client / src / pages / Availability / Services / AvailabilityServices.jsx
import { listAvailability } from "../../../services/fetch";
import { saveAvailability } from "../../../services/mutation";
import { getSlotsForDays } from "../../../utils/availability";

/* -------- Fetch availability -------- */
export const fetchAvailability = async (
  selectedDay,
  setAvailability,
  setSlots,
) => {
  const data = await listAvailability();
  const items = data.availability || [];

  setAvailability(items);
  setSlots(getSlotsForDays(items, selectedDay));
};

/* -------- Save availability -------- */
export const submitAvailability = async (
  selectedDay,
  slots,
  setAvailability,
) => {
  const data = await saveAvailability({
    dayOfWeek: selectedDay,
    slots,
  });

  setAvailability((prev) => {
    const withoutDay = prev.filter((item) => item.dayOfWeek !== selectedDay);

    return [...withoutDay, data.availability].sort(
      (a, b) => a.dayOfWeek - b.dayOfWeek,
    );
  });
};
