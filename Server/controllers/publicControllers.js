// Server / controllers / publicControllers.js
import Service from "../models/Service.js";
import { getBusinessBySlug, toPublicBusiness } from "../utils/business.js";

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
