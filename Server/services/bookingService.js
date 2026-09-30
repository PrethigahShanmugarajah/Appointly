import Booking from "../models/Booking.js";
import { sendBookingNotification } from "../utils/bookingNotifications.js";
import { createBookingCalendarEvent } from "../utils/googleCalendar.js";
import { timeOverlap } from "../utils/overlap.js";
import { createBookingPayoutTransaction } from "../utils/wallet.js";

/* -------- Confirm Paid Booking -------- */
export const confirmPaidBooking = async ({
  booking,
  business,
  service,
  session,
}) => {
  if (booking.status === "confirmed" && booking.paymentStatus === "paid") {
    return booking;
  }

  const conflictingBookings = await Booking.find({
    _id: { $ne: booking._id },
    userId: booking.userId,
    date: booking.date,
    status: "confirmed",
  });

  const hasConflict = conflictingBookings.some((candidate) =>
    timeOverlap(
      booking.startTime,
      booking.endTime,
      candidate.startTime,
      candidate.endTime,
    ),
  );

  if (hasConflict) {
    booking.status = "payment_failed";
    booking.paymentStatus = "failed";
    await booking.save();
    throw new Error(
      "This slot is no longer available. The payment could not be completed.",
    );
  }

  booking.status = "confirmed";
  booking.paymentStatus = "paid";
  booking.payoutStatus =
    booking.providerPayoutAmount > 0 ? "available" : "not_required";

  try {
    const calendarResult = await createBookingCalendarEvent({
      business,
      service,
      booking,
    });

    booking.googleEventId = calendarResult.googleEventId || "";
    booking.customerCalendarUrl =
      calendarResult.customerCalendarUrl || booking.customerCalendarUrl;
  } catch (calendarError) {
    console.error(
      "Google Calendar confirmation failed:",
      calendarError.message,
    );
  }

  await booking.save();
  await createBookingPayoutTransaction({
    booking,
    description: `Booking payment from ${booking.customerName || "Customer"}`,
  });

  sendBookingNotification({
    business,
    service,
    booking,
    type: "confirmed",
  }).catch((emailError) =>
    console.error("Booking confirmation email failed:", emailError.message),
  );

  return booking;
};
