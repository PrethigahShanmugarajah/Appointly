import Availability from "../models/Availability.js";
import { isValidTimeRange } from "../utils/time.js";

/* -------- List Availability -------- */
export const listAvailability = async (req, res) => {
  try {
    const availability = (
      await Availability.find({ userId: req.user.id })
    ).sort((a, b) => a.dayOfWeek - b.dayOfWeek);

    return res.status(200).json({
      success: true,
      message:
        availability.length === 0
          ? "No availability found."
          : availability.length === 1
            ? "Availability retrieved successfully."
            : "Availability records retrieved successfully.",
      availability,
    });
  } catch (error) {
    console.error(
      "List Availability Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while retrieving availability.",
      error: `List Availability Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Save Availability -------- */
export const saveAvailability = async (req, res) => {
  try {
    const { dayOfWeek, slots } = req.body;

    if (dayOfWeek === undefined) {
      return res.status(400).json({
        success: false,
        message: "Day of week is required.",
      });
    }

    if (dayOfWeek < 0) {
      return res.status(400).json({
        success: false,
        message: "Day of week must be 0 or greater.",
      });
    }

    if (dayOfWeek > 6) {
      return res.status(400).json({
        success: false,
        message: "Day of week must be 6 or less.",
      });
    }

    const cleanedSlots = (slots || []).filter(
      (slot) =>
        slot.startTime &&
        slot.endTime &&
        isValidTimeRange(slot.startTime, slot.endTime),
    );

    const availability = await Availability.findOneAndUpdate(
      { userId: req.user.id, dayOfWeek },
      { slots: cleanedSlots },
      { new: true, upsert: true },
    );

    return res.status(200).json({
      success: true,
      message: "Availability saved successfully.",
      availability,
    });
  } catch (error) {
    console.error(
      "Save Availability Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while saving availability.",
      error: `Save Availability Error: ${error?.stack || error?.message || error}`,
    });
  }
};
