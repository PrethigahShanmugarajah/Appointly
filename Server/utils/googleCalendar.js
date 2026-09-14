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
