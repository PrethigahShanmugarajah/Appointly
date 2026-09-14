// Server / controllers / availabilityControllers.js
import Availability from "../models/Availability.js";

/* -------- List Availability -------- */
export const listAvailability = async (req, res) => {
  try {
    // const availability = (
    //   await Availability.find({ userId: req.user.id })
    // ).toSorted({ dayOfWeek: 1 });

    const availability = (await Availability.find({ userId: req.user.id }))
      // ).sort({ dayOfWeek: 1 });
      .sort((a, b) => a.dayOfWeek - b.dayOfWeek);

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
