// Server / utils / googleCalendar.js
import { google } from "googleapis";
import {
  googleCalendarScope,
  googleClientId,
  googleClientSecret,
  googleRedirectUri,
  timeZone,
} from "../config/env.js";
import { buildCustomerCalendarUrl } from "./calendarLink.js";

/* -------- Get Google OAuth Client -------- */
export const getOAuthClient = () => {
  return new google.auth.OAuth2(
    googleClientId,
    googleClientSecret,
    googleRedirectUri,
  );
};

/* -------- Get Google OAuth Tokens -------- */
export const getGoogleTokens = async (code) => {
  const oauth2Client = getOAuthClient();
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
};

/* -------- Generate Google OAuth Authorization URL -------- */
export const getGoogleAuthUrl = (userId) => {
  const oauth2Client = getOAuthClient();

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [googleCalendarScope],
    state: String(userId),
  });
};

/* -------- Cancel Booking Google Calendar Event -------- */
export const cancelBookingCalendarEvent = async ({ business, booking }) => {
  if (
    !business.googleCalendarConnected ||
    !business.googleRefreshToken ||
    !booking.googleEventId
  ) {
    return false;
  }

  const oauth2Client = getOAuthClient();
  oauth2Client.setCredentials({ refresh_token: business.googleRefreshToken });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  await calendar.events.patch({
    calendarId: business.googleCalendarId || "primary",
    eventId: booking.googleEventId,
    resource: { status: "cancelled" },
    sendUpdates: "all",
  });

  return true;
};

/* -------- Update Booking Google Calendar Event -------- */
export const updateBookingCalendarEvent = async ({
  business,
  service,
  booking,
}) => {
  const customerCalendarUrl = buildCustomerCalendarUrl({
    business,
    service,
    booking,
  });

  if (!business.googleCalendarConnected || !business.googleRefreshToken) {
    return { customerCalendarUrl };
  }

  if (!booking.googleEventId) {
    return createBookingCalendarEvent({ business, service, booking });
  }

  const oauth2Client = getOAuthClient();
  oauth2Client.setCredentials({ refresh_token: business.googleRefreshToken });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  const summary = `${service.name} - ${booking.customerName}`;
  const description = [
    `Customer: ${booking.customerName}`,
    `Email: ${booking.customerEmail}`,
    booking.notes ? `Notes: ${booking.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const event = {
    summary,
    description,
    start: {
      dateTime: `${booking.date}T${booking.startTime}:00`,
      timeZone: business.timeZone || timeZone,
    },
    end: {
      dateTime: `${booking.date}T${booking.endTime}:00`,
      timeZone: business.timeZone || timeZone,
    },
    attendees: [{ email: booking.customerEmail }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 30 },
      ],
    },
  };

  const { data } = await calendar.events.update({
    calendarId: business.googleCalendarId || "primary",
    eventId: booking.googleEventId,
    resource: event,
    sendUpdates: "all",
  });

  return {
    googleEventId: data.id,
    customerCalendarUrl,
  };
};
