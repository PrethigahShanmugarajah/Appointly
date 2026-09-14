// Server / utils / calendarLink.js
import { googleCalendarUrl } from "../config/env.js";

/* -------- Build Google Calendar Event URL for Customer -------- */
export const buildCustomerCalendarUrl = ({ business, service, booking }) => {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${service.name} with ${business.businessName || business.name}`,
    dates: `${toGoogleDateTime(booking.date, booking.startTime)}/${toGoogleDateTime(booking.date, booking.endTime)}`,
    details:
      booking.notes || `Booking with ${business.businessName || business.name}`,
  });

  return `${googleCalendarUrl}?${params.toString()}`;
};
