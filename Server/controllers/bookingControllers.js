// Server / controllers / bookingControllers.js
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import { buildCustomerCalendarUrl } from "../utils/calendarLink.js";

/* -------- List Bookings -------- */
export const listBookings = async (req, res) => {
  try {
    const query = { userId: req.user.id };

    if (req.query.status) {
      if (req.query.status === "rescheduled") {
        query.isRescheduled = true;
      } else {
        query.status = req.query.status;
      }
    }

    if (!req.query.status || req.query.status === "rescheduled") {
      query.status = { $nin: ["pending_payment", "payment_failed"] };
    }

    if (req.query.date) query.date = req.query.date;

    const [bookings, business] = await Promise.all([
      Booking.find(query)
        .populate("serviceId", "name duration price")
        .sort({ createdAt: -1 })
        .lean(),
      User.findById(req.user.id).select("name businessName").lean(),
    ]);

    const bookingsWithCalendarUrls = bookings.map((booking) => {
      if (booking.customerCalendarUrl || !business || !booking.serviceId) {
        return booking;
      }

      return {
        ...booking,
        customerCalendarUrl: buildCustomerCalendarUrl({
          business,
          service: booking.serviceId,
          booking,
        }),
      };
    });

    return res.status(200).json({
      success: true,
      message:
        bookingsWithCalendarUrls.length === 0
          ? "No bookings found."
          : bookingsWithCalendarUrls.length === 1
            ? "Booking retrieved successfully."
            : "Bookings retrieved successfully.",
      bookings: bookingsWithCalendarUrls,
    });
  } catch (error) {
    console.error(
      "List Bookings Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while retrieving the bookings.",
      error: `List Bookings Error: ${error?.stack || error?.message || error}`,
    });
  }
};
