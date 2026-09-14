// Server / controllers / integrationControllers.js
import {
  clientUrl,
  googleClientId,
  googleClientSecret,
  googleRedirectUri,
} from "../config/env.js";
import User from "../models/User.js";
import { getGoogleAuthUrl, getGoogleTokens } from "../utils/googleCalendar.js";

/* -------- Get Google Connect URL -------- */
export const getGoogleConnectUrl = async (req, res) => {
  try {
    if (!googleClientId || !googleClientSecret || !googleRedirectUri) {
      return res.status(503).json({
        success: false,
        message: "Google Calendar is not configured yet.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Google Calendar connection URL generated successfully.",
      url: getGoogleAuthUrl(req.user.id),
    });
  } catch (error) {
    console.error(
      "Get Google Connect URL Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while generating the Google Calendar connection URL.",
      error: `Get Google Connect URL Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Handle Google OAuth Callback -------- */
export const handleGoogleCallback = async (req, res) => {
  try {
    const { code, state } = req.query;

    console.log("Google OAuth Code:", code);
    console.log("Google OAuth State:", state);
    console.log("Getting Google OAuth Tokens...");

    if (!code || !state) {
      return res.redirect(`${clientUrl}/profile?calendar=failed`);
    }

    const tokens = await getGoogleTokens(code);

    if (!tokens.refresh_token) {
      return res.redirect(
        `${clientUrl}/profile?calendar=missing-refresh-token`,
      );
    }

    await User.findByIdAndUpdate(state, {
      googleRefreshToken: tokens.refresh_token,
      googleCalendarConnected: true,
      googleCalendarId: "primary",
    });

    return res.redirect(`${clientUrl}/profile?calendar=connected`);
  } catch (error) {
    console.error(
      "Google Callback Error:",
      error?.stack || error?.message || error,
    );

    return res.redirect(`${clientUrl}/profile?calendar=failed`);
  }
};
