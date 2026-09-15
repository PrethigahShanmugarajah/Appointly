// Server / utils / bookingNotifications.js
import https from "https";
import {
  brevoApiKey,
  brevoSenderEmail,
  brevoSenderName,
  brevoTransactionalEmailUrl,
  emailFrom,
  otpTtlMinutes,
} from "../config/env.js";

/* -------- Escapes special HTML characters to safely display text in emails. -------- */
const escapeHtml = (value = "") => {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

/* -------- Builds the HTML template used for Appointly transactional emails. -------- */
const buildCompanyEmailHtml = ({
  title,
  eyebrow = "Appointly",
  intro,
  rows,
  accent = "#7D57F5",
  notes,
  calendarUrl,
  footer,
}) => {
  const detailRows = rows
    .filter(
      (row) =>
        row.value !== undefined && row.value !== null && row.value !== "",
    )
    .map(
      (row) => `
      <tr>
        <td style="padding: 14px 0; color: #94a3b8; font-size: 13px; width: 36%; vertical-align: top;">${escapeHtml(row.label)}</td>
        <td style="padding: 14px 0; color: #1e293b; font-size: 14px; font-weight: 700;">${escapeHtml(row.value)}</td>
      </tr>
    `,
    )
    .join("");

  return `
    <!doctype html>
    <html>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inria+Serif:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
          rel="stylesheet"
        >
      </head>

      <body style="margin:0; padding:0; background:#f1f0f5; font-family:'Inter', Arial, Helvetica, sans-serif; color:#1e293b;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f1f0f5; padding:40px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; background:#ffffff; border-radius:24px; overflow:hidden; box-shadow: 0 4px 24px rgba(125,87,245,0.08);">
                <!-- Header with brand gradient -->
                <tr>
                  <td style="background: linear-gradient(180deg, #CBB8FF 0%, #9B7BFF 50%, #7D57F5 100%); padding:36px 36px 32px; text-align:center;">
                    <div style="font-size:11px; letter-spacing:2.5px; text-transform:uppercase; font-weight:800; color:rgba(255,255,255,0.8); margin-bottom:12px;">
                      ${escapeHtml(eyebrow)}
                    </div>

                    <h1 style="margin:0; font-size:28px; line-height:1.25; color:#ffffff; font-weight:800;">
                      ${escapeHtml(title)}
                    </h1>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:32px 36px 36px;">
                    <p style="margin:0 0 24px; font-size:15px; line-height:1.7; color:#475569;">
                      ${escapeHtml(intro)}
                    </p>

                    <!-- Details table -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:2px solid #EBE4FF; border-bottom:2px solid #EBE4FF;">
                      ${detailRows}
                    </table>

                    ${
                      notes
                        ? `
                      <div style="margin:24px 0 0; padding:16px 18px; background:#F4F0FF; border:1px solid #EBE4FF; border-radius:14px; color:#475569; font-size:14px; line-height:1.6;">
                        <strong style="color:#7D57F5;">Notes:</strong> 
                        ${escapeHtml(notes)}
                      </div>`
                        : ""
                    }

                    ${
                      calendarUrl
                        ? `
                      <p style="margin:28px 0 0; text-align:center;">
                        <a href="${escapeHtml(calendarUrl)}" style="display:inline-block; background:linear-gradient(180deg, #9B7BFF 0%, #7D57F5 100%); color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:14px; font-size:14px; font-weight:700; letter-spacing:0.3px;">
                          Add to Google Calendar
                        </a>
                      </p>`
                        : ""
                    }

                    <p style="margin:28px 0 0; color:#94a3b8; font-size:13px; line-height:1.6;">
                      ${escapeHtml(footer)}
                    </p>
                  </td>
                </tr>

                <!-- Footer bar -->
                <tr>
                  <td style="padding:0 36px 28px; text-align:center;">
                    <div style="border-top:1px solid #f1f5f9; padding-top:20px;">
                      <span style="font-size:12px; font-weight:700; color:#CBB8FF; letter-spacing:1.5px; text-transform:uppercase;">
                        Powered by Appointly
                      </span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};

/* -------- Extracts an email address from a text value. -------- */
const parseEmailAddress = (value = "") => {
  const match = value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match?.[0] || "";
};

/* -------- Returns the configured sender email address and sender name. -------- */
const getSender = () => {
  const from = emailFrom || "";
  const email = brevoSenderEmail || parseEmailAddress(from) || "";
  const name = brevoSenderName || stripEmailAddress(from) || "Appointly";

  return { email, name };
};

/* -------- Checks whether the required Brevo email configuration is available. -------- */
export const getEmailConfigStatus = () => {
  const sender = getSender();
  const missing = [];

  if (!brevoTransactionalEmailUrl)
    missing.push("BREVO_TRANSACTIONAL_EMAIL_URL");
  if (!brevoApiKey) missing.push("BREVO_API_KEY");
  if (!sender.email) missing.push("BREVO_SENDER_EMAIL or EMAIL_FROM");
  if (sender.email && parseEmailAddress(sender.email) !== sender.email) {
    missing.push("valid BREVO_SENDER_EMAIL");
  }

  return {
    provider: "brevo",
    configured: missing.length === 0,
    missing,
    from: sender.email,
    senderName: sender.name,
    mode: "platform",
    requiresPerUserAuthorization: false,
  };
};

/* -------- Returns the platform sender details used for transactional emails. -------- */
const getPlatformSender = (senderName) => {
  const sender = getSender();

  return {
    email: sender.email,
    name: senderName || sender.name,
  };
};

/* -------- Validates and returns the reply-to email details. -------- */
const getReplyTo = (replyTo) => {
  const email = parseEmailAddress(replyTo?.email || "");
  if (!email) return null;

  return {
    email,
    name: replyTo.name || email,
  };
};

/* -------- Sends a transactional email through the Brevo API. -------- */
const sendWithBrevo = async ({
  to,
  subject,
  text,
  htmlContent,
  senderName,
  replyTo,
}) => {
  const status = getEmailConfigStatus();
  if (!status.configured) {
    throw new Error(
      `BREVO email is not configured. Missing: ${status.missing.join(", ")}`,
    );
  }

  const payload = {
    sender: getPlatformSender(senderName),
    to: [{ email: to }],
    subject,
    textContent: text,
    htmlContent,
  };

  const normalizedReplyTo = getReplyTo(replyTo);
  if (normalizedReplyTo) {
    payload.replyTo = normalizedReplyTo;
  }

  const postData = JSON.stringify(payload);

  return new Promise((resolve, reject) => {
    const req = https.request(
      brevoTransactionalEmailUrl,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "api-key": brevoApiKey,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
        },
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          let parsed = {};
          try {
            parsed = JSON.parse(body);
          } catch (e) {}

          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({
              sent: true,
              provider: "brevo",
              messageId: parsed.messageId,
            });
          } else {
            reject(new Error(getBrevoErrorMessage(res.statusCode, parsed)));
          }
        });
      },
    );

    req.on("error", (e) => reject(e));
    req.write(postData);
    req.end();
  });
};

/* -------- Sends an OTP verification email through Brevo. -------- */
export const sendOtpNotification = async ({ email, code, purpose }) => {
  const title =
    purpose === "registration"
      ? "Verify your Appointly account"
      : "Verify your booking email";
  const intro = `Use this verification code to continue. The code expires in ${otpTtlMinutes} minutes.`;
  const htmlContent = buildCompanyEmailHtml({
    title,
    intro,
    rows: [
      { label: "Verification code", value: code },
      { label: "Expires in", value: `${otpTtlMinutes} minutes` },
    ],
    footer: "If you did not request this code, you can ignore this email.",
  });

  return sendWithBrevo({
    to: email,
    subject: title,
    text: `${intro}\n\nVerification code: ${code}\nExpires in: ${otpTtlMinutes} minutes`,
    htmlContent,
  });
};

/* -------- Sends booking notifications to the customer and business provider. -------- */
export const sendBookingNotification = async ({
  business,
  service,
  booking,
  type = "confirmed",
}) => {
  const configStatus = getEmailConfigStatus();
  if (!configStatus.configured) {
    return {
      skipped: true,
      reason: `BREVO email is not configured. Missing: ${configStatus.missing.join(", ")}`,
    };
  }

  const recipients = [
    { email: booking.customerEmail, type: "customer" },
    { email: business.email, type: "provider" },
  ].filter(
    (recipient, index, list) =>
      recipient.email &&
      list.findIndex((candidate) => candidate.email === recipient.email) ===
        index,
  );

  const results = [];
  for (const recipient of recipients) {
    const message = buildBookingMessage({
      business,
      service,
      booking,
      type,
      recipientType: recipient.type,
    });

    const result = await sendWithBrevo({
      to: recipient.email,
      senderName: business.businessName || business.name || "Appointly",
      replyTo:
        recipient.type === "customer"
          ? {
              email: business.email,
              name: business.businessName || business.name || "Provider",
            }
          : {
              email: booking.customerEmail,
              name: booking.customerName || "Customer",
            },
      ...message,
    });
    results.push({ email: recipient.email, type: recipient.type, ...result });
  }

  return { sent: true, provider: "brevo", recipients: results };
};
