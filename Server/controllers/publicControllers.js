// Server / controllers / publicControllers.js
import Service from "../models/Service.js";
import { normalizedEmail } from "../utils/auth.js";
import { getBusinessBySlug, toPublicBusiness } from "../utils/business.js";
import { generateSlots } from "../utils/slotGenerator.js";
import { requestEmailOtp } from "../utils/emailOtp.js";

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
