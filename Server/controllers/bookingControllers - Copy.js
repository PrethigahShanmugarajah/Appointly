// Server / controllers / bookingControllers.js
import Booking from "../models/Booking.js";
import Service from "../models/Service.js";
import User from "../models/User.js";
import { sendBookingNotification } from "../utils/bookingNotifications.js";
import { buildCustomerCalendarUrl } from "../utils/calendarLink.js";
import {
  cancelBookingCalendarEvent,
  updateBookingCalendarEvent,
} from "../utils/googleCalendar.js";
import { timeOverlap } from "../utils/overlap.js";

/* -------- Reschedule Booking -------- */
export const rescheduleBooking = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;

    // if (!date || !startTime || !endTime) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Date, start time, and end time are required.",
    //   });
    // }

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
