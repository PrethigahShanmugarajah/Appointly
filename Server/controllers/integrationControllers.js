// Server / controllers / integrationControllers.js
import {
  googleClientId,
  googleClientSecret,
  googleRedirectUri,
} from "../config/env.js";
import { getGoogleAuthUrl } from "../utils/googleCalendar.js";

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
