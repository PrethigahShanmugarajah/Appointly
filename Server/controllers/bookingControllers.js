// Server / controllers / bookingControllers.js
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import { buildCustomerCalendarUrl } from "../utils/calendarLink.js";
import { sendBookingNotification } from "../utils/bookingNotifications.js";
import { cancelBookingCalendarEvent } from "../utils/googleCalendar.js";

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

/* -------- Update Booking Status -------- */
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = [
      "pending",
      "pending_payment",
      "confirmed",
      "cancelled",
      "payment_failed",
    ];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status.",
      });
    }

    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { status },
      { new: true },
    ).populate("serviceId", "name duration price");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    const business = await User.findById(req.user.id);
    if (business && status === "cancelled") {
      try {
        await cancelBookingCalendarEvent({ business, booking });
      } catch (calendarError) {
        console.error(
          "Google Calendar cancellation failed:",
          calendarError.message,
        );
      }
    }

    let emailResult = null;
    if (business && booking.serviceId) {
      emailResult = { sent: "processing" };
      sendBookingNotification({
        business,
        service: booking.serviceId,
        booking,
        type: status === "cancelled" ? "cancelled" : "status",
      }).catch((emailError) =>
        console.error("Booking status email failed:", emailError.message),
      );
    }

    return res.status(200).json({
      success: true,
      message:
        status === "cancelled"
          ? "Booking cancelled successfully."
          : status === "confirmed"
            ? "Booking confirmed successfully."
            : status === "pending"
              ? "Booking status updated to pending successfully."
              : status === "pending_payment"
                ? "Booking status updated to pending payment successfully."
                : status === "payment_failed"
                  ? "Booking status updated to payment failed successfully."
                  : "Booking status updated successfully.",
      booking,
      email: emailResult,
    });
  } catch (error) {
    console.error(
      "Update Booking Status Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while updating the booking status.",
      error: `Update Booking Status Error: ${error?.stack || error?.message || error}`,
    });
  }
};
