// Server / utils / business.js
import User from "../models/User.js";

/* -------- Get Business by Slug -------- */
export const getBusinessBySlug = async (slug) => {
  return User.findOne({ slug }).select("-password");
};

/* -------- Convert Business to Public Data -------- */
export const toPublicBusiness = (business) => ({
  id: business._id,
  name: business.name,
  slug: business.slug,
  businessName: business.businessName,
  businessDescription: business.businessDescription,
  brandTheme: business.brandTheme,
  brandAccent: business.brandAccent,
  timezone: business.timezone,
  googleCalendarConnected: business.googleCalendarConnected,
});
