// Client / src / pages / Availability / View / Availability.jsx
import { useEffect, useMemo, useState } from "react";
import { defaultSlot, getSlotsForDays } from "../../../utils/availability";
import {
  fetchAvailability,
  submitAvailability,
} from "../Services/AvailabilityServices";
import { toast } from "react-toastify";
import AppLayout from "../../../components/AppLayout";
import AvailabilityDaySelector from "../Components/AvailabilityDaySelector";
import AvailabilityTimeSlots from "../Components/AvailabilityTimeSlots";

const Availability = () => {
  const [availability, setAvailability] = useState([]);
  const [selectedDay, setSelectedDay] = useState(1);
  const [slots, setSlots] = useState([defaultSlot]);
  const [loading, setLoading] = useState(false);

  const currentDaySummary = useMemo(
    () => availability.find((item) => item.dayOfWeek === selectedDay),
    [availability, selectedDay],
  );

  useEffect(() => {
    fetchAvailability(selectedDay, setAvailability, setSlots);
  }, [selectedDay]);

  const updateSlot = (index, field, value) => {
    let newSlot = { ...slots[index], [field]: value };

    if (newSlot.startTime >= newSlot.endTime) {
      if (field === "startTime") {
        const [h, m] = newSlot.startTime.split(":");
        let nextH = Math.min(23, parseInt(h, 10) + 1);
        newSlot.endTime = `${String(nextH).padStart(2, "0")}:${m}`;
      } else {
        const [h, m] = newSlot.endTime.split(":");
        let prevH = Math.max(0, parseInt(h, 10) - 1);
        newSlot.startTime = `${String(prevH).padStart(2, "0")}:${m}`;
      }
    }

    const isOverlapping = slots.some((slot, i) => {
      if (i === index) return false;
      return (
        slot.startTime < newSlot.endTime && newSlot.startTime < slot.endTime
      );
    });

    if (isOverlapping) {
      toast.error("Overlap detected: Time falls within an existing slot.");
      return;
    }

    setSlots((prev) =>
      prev.map((slot, slotIndex) => (slotIndex === index ? newSlot : slot)),
    );
  };

  const addSlot = () => {
    if (slots.length === 0) {
      setSlots([defaultSlot]);
      return;
    }

    const sorted = [...slots].sort((a, b) =>
      a.endTime.localeCompare(b.endTime),
    );
    const latest = sorted[sorted.length - 1];

    const [h, m] = latest.endTime.split(":");
    let startH = parseInt(h, 10);

    if (startH >= 23) {
      toast.error("Cannot add slot: No more hours available.");
      return;
    }
    let endH = startH + 1;

    const newStart = `${String(startH).padStart(2, "0")}:${m}`;
    const newEnd = `${String(endH).padStart(2, "0")}:${m}`;

    setSlots((prev) => [...prev, { startTime: newStart, endTime: newEnd }]);
  };

  const removeSlot = (index) => {
    setSlots((prev) => prev.filter((_, slotIndex) => slotIndex !== index));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await submitAvailability(selectedDay, slots, setAvailability);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        {/* -------- Left Day Selector -------- */}
        <AvailabilityDaySelector
          availability={availability}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          setSlots={setSlots}
          getSlotsForDays={getSlotsForDays}
        />

        {/* -------- Right Time Slots -------- */}
        <AvailabilityTimeSlots
          selectedDay={selectedDay}
          currentDaySummary={currentDaySummary}
          slots={slots}
          loading={loading}
          addSlot={addSlot}
          updateSlot={updateSlot}
          removeSlot={removeSlot}
          handleSave={handleSave}
        />
      </div>
    </AppLayout>
  );
};

export default Availability;
