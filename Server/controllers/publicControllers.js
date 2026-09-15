// Server / controllers / publicControllers.js
import Service from "../models/Service.js";
import { normalizedEmail } from "../utils/auth.js";
import {
  findActiveSlotBookings,
  getBusinessBySlug,
  toPublicBusiness,
} from "../utils/business.js";
import { generateSlots } from "../utils/slotGenerator.js";
import { requestEmailOtp, verifyEmailOtp } from "../utils/emailOtp.js";
import { clientUrl, currency } from "../config/env.js";
import Booking from "../models/Booking.js";
import { sendBookingNotification } from "../utils/bookingNotifications.js";
import { buildCustomerCalendarUrl } from "../utils/calendarLink.js";
import { createBookingCalendarEvent } from "../utils/googleCalendar.js";
import { calculatePlatformSplit } from "../utils/money.js";
import { timeOverlap } from "../utils/overlap.js";
import { getStripe, toStripeAmount } from "../utils/stripe.js";

/* -------- Get Public Business -------- */
export const getPublicBusiness = async (req, res) => {
  try {
    const business = await getBusinessBySlug(req.params.slug);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business was not found.",
      });
    }

    const services = await Service.find({
      userId: business._id,
      isActive: true,
      isDeleted: { $ne: true },
    }).sort({ name: 1 });

    return res.status(200).json({
      success: true,
      message: "Business details retrieved successfully.",
      business: toPublicBusiness(business),
      services,
    });
  } catch (error) {
    console.error(
      "Get Public Business Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while retrieving the business details.",
      error: `Get Public Business Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Get Public Slots -------- */
export const getPublicSlots = async (req, res) => {
  try {
    const { date, serviceId } = req.query;

    // if (!date || !serviceId) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Date and service are required.",
    //   });
    // }

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required.",
      });
    }

    if (!serviceId) {
      return res.status(400).json({
        success: false,
        message: "Service ID is required.",
      });
    }

    const business = await getBusinessBySlug(req.params.slug);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business was not found.",
      });
    }

    const service = await Service.findOne({
      _id: serviceId,
      userId: business._id,
      isActive: true,
      isDeleted: { $ne: true },
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    const slots = await generateSlots({ userId: business._id, service, date });

    return res.status(200).json({
      success: true,
      message: "Available booking slots retrieved successfully.",
      slots,
    });
  } catch (error) {
    console.error(
      "Get Public Slots Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while retrieving the available booking slots.",
      error: `Get Public Slots Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Request Public Booking OTP -------- */
export const requestPublicBookingOtp = async (req, res) => {
  try {
    const { customerEmail } = req.body;

    const normalizedEmailValue = normalizedEmail(customerEmail);

    if (!normalizedEmailValue) {
      return res.status(400).json({
        success: false,
        message: "Customer email is required.",
      });
    }

    const business = await getBusinessBySlug(req.params.slug);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business was not found.",
      });
    }

    const result = await requestEmailOtp({
      email: normalizedEmailValue,
      purpose: "booking",
    });

    return res.status(200).json({
      success: true,
      message: "Booking verification code sent successfully.",
      result,
    });
  } catch (error) {
    console.error(
      "Request Public Booking OTP Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while requesting the booking verification code.",
      error: `Request Public Booking OTP Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Verify Public Booking OTP -------- */
export const verifyPublicBookingOtp = async (req, res) => {
  try {
    const { customerEmail, emailOtp } = req.body;

    // if (!customerEmail || !emailOtp) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Email and OTP are required.",
    //   });
    // }

    const normalizedEmailValue = normalizedEmail(customerEmail);

    if (!normalizedEmailValue) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!emailOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required.",
      });
    }

    const otpResult = await verifyEmailOtp({
      email: normalizedEmailValue,
      purpose: "booking",
      code: emailOtp,
      consume: false,
    });

    if (!otpResult.verified) {
      return res.status(400).json({
        success: false,
        message: otpResult.reason || "OTP verification failed.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking verification code verified successfully.",
    });
  } catch (error) {
    console.error(
      "Verify Public Booking OTP Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while verifying the booking verification code.",
      error: `Verify Public Booking OTP Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Create Public Booking -------- */
export const createPublicBooking = async (req, res) => {
  try {
    const {
      serviceId,
      customerName,
      customerEmail,
      customerAvatar,
      date,
      startTime,
      endTime,
      notes,
      emailOtp,
    } = req.body;

    const normalizedCustomerEmail = normalizedEmail(customerEmail);

    // if (
    //   !serviceId ||
    //   !customerName ||
    //   !customerEmail ||
    //   !date ||
    //   !startTime ||
    //   !endTime
    // ) {
    //   return res.status(400).json({
    //     success: false,
    //     message:
    //       "Service, customer name, customer email, date, start time, and end time are required.",
    //   });
    // }

    if (!serviceId) {
      return res.status(400).json({
        success: false,
        message: "Service ID is required.",
      });
    }

    if (!customerName) {
      return res.status(400).json({
        success: false,
        message: "Customer name is required.",
      });
    }

    if (!normalizedCustomerEmail) {
      return res.status(400).json({
        success: false,
        message: "Customer email is required.",
      });
    }

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Booking date is required.",
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

    if (!emailOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required.",
      });
    }

    const business = await getBusinessBySlug(req.params.slug);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business was not found.",
      });
    }

    const service = await Service.findOne({
      _id: serviceId,
      userId: business._id,
      isActive: true,
      isDeleted: { $ne: true },
    });
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "The requested service was not found.",
      });
    }

    const bookings = await findActiveSlotBookings({
      userId: business._id,
      date,
    });

    const hasConflict = bookings.some((booking) =>
      timeOverlap(startTime, endTime, booking.startTime, booking.endTime),
    );

    if (hasConflict) {
      return res.status(409).json({
        success: false,
        message: "The selected time slot is no longer available.",
      });
    }

    const otpResult = await verifyEmailOtp({
      email: normalizedCustomerEmail,
      purpose: "booking",
      code: emailOtp,
      consume: true,
    });

    if (!otpResult.verified) {
      return res.status(400).json({
        success: false,
        message: otpResult.reason || "OTP verification is required.",
      });
    }

    const amount = toStripeAmount(service.price);

    const { platformFeeAmount, providerPayoutAmount } =
      calculatePlatformSplit(amount);

    const bookingCurrency = currency;

    const stripe = amount > 0 ? getStripe() : null;

    if (amount > 0 && !stripe) {
      return res.status(503).json({
        success: false,
        message: "Stripe payments are not configured yet.",
      });
    }

    const customerCalendarUrl = buildCustomerCalendarUrl({
      business,
      service,
      booking: {
        date,
        startTime,
        endTime,
        customerName,
        customerEmail: normalizedCustomerEmail,
        notes,
      },
    });

    const booking = await Booking.create({
      userId: business._id,
      serviceId,
      customerName,
      customerEmail: normalizedCustomerEmail,
      customerAvatar: customerAvatar || "A1.png",
      date,
      startTime,
      endTime,
      notes: notes || "",
      amount,
      platformFeeAmount,
      providerPayoutAmount,
      payoutStatus: amount > 0 ? "pending" : "not_required",
      currency: bookingCurrency,
      paymentStatus: amount > 0 ? "pending" : "not_required",
      status: amount > 0 ? "pending_payment" : "confirmed",
      customerCalendarUrl,
    });

    if (amount === 0) {
      try {
        const calendarResult = await createBookingCalendarEvent({
          business,
          service,
          booking,
        });

        booking.googleEventId = calendarResult.googleEventId || "";
        booking.customerCalendarUrl = calendarResult.customerCalendarUrl;
        await booking.save();
      } catch (calendarError) {
        console.error(
          "Google Calendar booking event creation failed:",
          calendarError?.message || calendarError,
        );

        booking.customerCalendarUrl = customerCalendarUrl;
        await booking.save();
      }

      let emailResult = { sent: "processing" };
      sendBookingNotification({
        business,
        service,
        booking,
        type: "confirmed",
      }).catch((emailError) =>
        console.error("Booking confirmation email failed:", emailError.message),
      );

      return res.status(201).json({
        success: true,
        message: "Booking confirmed successfully.",
        booking,
        customerCalendarUrl: booking.customerCalendarUrl,
        email: emailResult,
      });
    }

    const defaultClientUrl = clientUrl || "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: normalizedCustomerEmail,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: bookingCurrency,
            unit_amount: amount,
            product_data: {
              name: service.name,
              description: `${date} ${startTime}-${endTime}`,
            },
          },
        },
      ],
      metadata: {
        bookingId: String(booking._id),
      },
      success_url: `${defaultClientUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}&slug=${business.slug}`,
      cancel_url: `${defaultClientUrl}/booking/cancelled?booking_id=${booking._id}&slug=${business.slug}`,
    });

    booking.stripeSessionId = session.id;
    await booking.save();

    return res.status(201).json({
      success: true,
      message: "Booking created successfully. Please proceed to payment.",
      bookingId: booking._id,
      checkoutUrl: session.url,
    });
  } catch (error) {
    console.error(
      "Create Public Booking Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while creating the booking.",
      error: `Create Public Booking Error: ${error?.stack || error?.message || error}`,
    });
  }
};
