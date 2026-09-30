import Booking from "../models/Booking.js";
import User from "../models/User.js";
import { holdWindowStart } from "./time.js";

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

/* -------- Find Active Slot Bookings -------- */
export const findActiveSlotBookings = ({ userId, date }) => {
  return Booking.find({
    userId,
    date,
    $or: [
      { status: "confirmed" },
      { status: "pending_payment", createdAt: { $gte: holdWindowStart() } },
    ],
  });
};
