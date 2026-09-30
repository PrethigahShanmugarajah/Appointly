import Booking from "../models/Booking.js";
import User from "../models/User.js";
import { buildCustomerCalendarUrl } from "../utils/calendarLink.js";
import { sendBookingNotification } from "../utils/bookingNotifications.js";
import {
  cancelBookingCalendarEvent,
  updateBookingCalendarEvent,
} from "../utils/googleCalendar.js";
import Service from "../models/Service.js";
import { timeOverlap } from "../utils/overlap.js";

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

/* -------- Reschedule Booking -------- */
export const rescheduleBooking = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required.",
      });
    }

    if (!startTime) {
      return res.status(400).json({
        success: false,
        message: "Start time is required.",
      });
    }

    if (!endTime) {
      return res.status(400).json({
        success: false,
        message: "End time is required.",
      });
    }

    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    const conflictingBookings = await Booking.find({
      _id: { $ne: booking._id },
      userId: req.user.id,
      date,
      status: { $nin: ["cancelled", "payment_failed"] },
    });

    const hasConflict = conflictingBookings.some((candidate) =>
      timeOverlap(startTime, endTime, candidate.startTime, candidate.endTime),
    );

    if (hasConflict) {
      return res.status(409).json({
        success: false,
        message: "The selected time slot is already booked.",
      });
    }

    booking.date = date;
    booking.startTime = startTime;
    booking.endTime = endTime;
    booking.status =
      booking.status === "cancelled" ? "confirmed" : booking.status;
    booking.isRescheduled = true;
    booking.rescheduleCount = (booking.rescheduleCount || 0) + 1;

    const [business, service] = await Promise.all([
      User.findById(req.user.id),
      Service.findById(booking.serviceId),
    ]);

    if (business && service) {
      try {
        const calendarResult = await updateBookingCalendarEvent({
          business,
          service,
          booking,
        });
        booking.googleEventId =
          calendarResult.googleEventId || booking.googleEventId || "";
        booking.customerCalendarUrl =
          calendarResult.customerCalendarUrl || booking.customerCalendarUrl;
      } catch (calendarError) {
        console.error(
          "Google Calendar reschedule failed:",
          calendarError.message,
        );
      }
    }

    await booking.save();

    const populatedBooking = await Booking.findById(booking._id).populate(
      "serviceId",
      "name duration price",
    );

    let emailResult = null;
    if (business && service) {
      emailResult = { sent: "processing" };
      sendBookingNotification({
        business,
        service,
        booking: populatedBooking,
        type: "rescheduled",
      }).catch((emailError) =>
        console.error("Booking reschedule email failed:", emailError.message),
      );
    }

    return res.status(200).json({
      success: true,
      message: "Booking rescheduled successfully.",
      booking: populatedBooking,
      email: emailResult,
    });
  } catch (error) {
    console.error(
      "Reschedule Booking Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while rescheduling the booking.",
      error: `Reschedule Booking Error: ${error?.stack || error?.message || error}`,
    });
  }
};
