// Server / utils / googleCalendar.js
import { google } from "googleapis";
import {
  googleCalendarScope,
  googleClientId,
  googleClientSecret,
  googleRedirectUri,
} from "../config/env.js";

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
