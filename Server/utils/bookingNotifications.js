import https from "https";
import {
  brevoApiKey,
  brevoSenderEmail,
  brevoSenderName,
  brevoTransactionalEmailUrl,
  currencyCode,
  emailFrom,
  locale,
  otpTtlMinutes,
  timeZone,
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
  accent = "#2DD4BF",
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
        <td style="padding: 14px 0; color: #9CA3AF; font-size: 13px; width: 36%; vertical-align: top;">${escapeHtml(row.label)}</td>
        <td style="padding: 14px 0; color: #1F2937; font-size: 14px; font-weight: 700;">${escapeHtml(row.value)}</td>
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

      <body style="margin:0; padding:0; background:#F9FAFB; font-family:'Inter', Arial, Helvetica, sans-serif; color:#1F2937;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F9FAFB; padding:40px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; background:#ffffff; border-radius:24px; overflow:hidden; box-shadow: 0 4px 24px rgba(20,184,166,0.08);">
                <!-- Header with brand gradient -->
                <tr>
                  <td style="background: linear-gradient(180deg, #99F6E4 0%, #5EEAD4 50%, #2DD4BF 100%); padding:36px 36px 32px; text-align:center;">
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
                    <p style="margin:0 0 24px; font-size:15px; line-height:1.7; color:#4B5563;">
                      ${escapeHtml(intro)}
                    </p>

                    <!-- Details table -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:2px solid #CCFBF1; border-bottom:2px solid #CCFBF1;">
                      ${detailRows}
                    </table>

                    ${
                      notes
                        ? `
                      <div style="margin:24px 0 0; padding:16px 18px; background:#F0FDFA; border:1px solid #CCFBF1; border-radius:14px; color:#4B5563; font-size:14px; line-height:1.6;">
                        <strong style="color:#2DD4BF;">Notes:</strong> 
                        ${escapeHtml(notes)}
                      </div>`
                        : ""
                    }

                    ${
                      calendarUrl
                        ? `
                      <p style="margin:28px 0 0; text-align:center;">
                        <a href="${escapeHtml(calendarUrl)}" style="display:inline-block; background:linear-gradient(180deg, #5EEAD4 0%, #2DD4BF 100%); color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:14px; font-size:14px; font-weight:700; letter-spacing:0.3px;">
                          Add to Google Calendar
                        </a>
                      </p>`
                        : ""
                    }

                    <p style="margin:28px 0 0; color:#9CA3AF; font-size:13px; line-height:1.6;">
                      ${escapeHtml(footer)}
                    </p>
                  </td>
                </tr>

                <!-- Footer bar -->
                <tr>
                  <td style="padding:0 36px 28px; text-align:center;">
                    <div style="border-top:1px solid #F3F4F6; padding-top:20px;">
                      <span style="font-size:12px; font-weight:700; color:#99F6E4; letter-spacing:1.5px; text-transform:uppercase;">
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

/* -------- Removes the email address and extra characters from a sender value. -------- */
const stripEmailAddress = (value = "") => {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(parseEmailAddress(value), "")
    .replace(/["']/g, "")
    .trim();
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

/* -------- Creates a useful error message from a Brevo email failure. -------- */
const getBrevoErrorMessage = (statusCode, parsed) => {
  const message =
    parsed.message || `Brevo email failed with status ${statusCode}`;

  const lowerMessage = String(message).toLowerCase();

  if (
    lowerMessage.includes("ip") &&
    (lowerMessage.includes("unauthorized") ||
      lowerMessage.includes("not authorized"))
  ) {
    return [
      message,
      "Brevo rejected this server IP. For production, use one platform Brevo API key on the backend and either disable Brevo authorized IP restrictions or whitelist the production server outbound IP once.",
    ].join(" ");
  }

  return message;
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

/* -------- Formats an amount using the configured currency and locale. -------- */
const formatMoney = (amount = 0) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(amount / 100);
};

/* -------- Formats the booking date and time using the configured timezone. -------- */
const formatDateTime = (booking, timezone = timeZone) => {
  const date = new Date(`${booking.date}T${booking.startTime}:00`);
  const displayDate = new Intl.DateTimeFormat(locale, {
    dateStyle: "full",
    timeZone: timezone,
  }).format(date);

  return `${displayDate}, ${booking.startTime}-${booking.endTime}`;
};

/* -------- Builds the email subject based on the booking type and recipient. -------- */
const buildSubject = (type, businessName, recipientType) => {
  if (recipientType === "provider") {
    if (type === "rescheduled") return `Booking rescheduled: ${businessName}`;
    if (type === "cancelled") return `Booking cancelled: ${businessName}`;
    if (type === "status") return `Booking status updated: ${businessName}`;
    return `New booking received: ${businessName}`;
  }

  if (type === "rescheduled")
    return `Your booking with ${businessName} was rescheduled`;
  if (type === "cancelled")
    return `Your booking with ${businessName} was cancelled`;
  if (type === "status") return `Your booking with ${businessName} was updated`;
  return `Your booking with ${businessName} is confirmed`;
};

/* -------- Builds the introductory message based on the booking type and recipient. -------- */
const buildIntro = ({ type, serviceName, recipientType }) => {
  if (recipientType === "provider") {
    if (type === "rescheduled")
      return `A ${serviceName} booking has been rescheduled.`;
    if (type === "cancelled")
      return `A ${serviceName} booking has been cancelled.`;
    if (type === "status")
      return `A ${serviceName} booking status was updated.`;
    return `You received a new ${serviceName} booking.`;
  }

  if (type === "rescheduled")
    return `Your ${serviceName} booking has been rescheduled.`;
  if (type === "cancelled")
    return `Your ${serviceName} booking has been cancelled.`;
  if (type === "status") return `Your ${serviceName} booking was updated.`;
  return `Your ${serviceName} booking is confirmed.`;
};

/* -------- Builds the subject, text, and HTML content for a booking notification. -------- */
const buildBookingMessage = ({
  business,
  service,
  booking,
  type,
  recipientType,
}) => {
  const businessName = business.businessName || business.name || "Appointly";
  const serviceName = service.name || "appointment";
  const appointmentTime = formatDateTime(booking, business.timezone);
  const bookingStatus = String(booking.status || "").replace("_", " ");
  const paymentStatus = String(booking.paymentStatus || "not_required").replace(
    "_",
    " ",
  );
  const amount = formatMoney(booking.amount || 0, booking.currency || "inr");
  const intro = buildIntro({ type, serviceName, recipientType });
  const subject = buildSubject(type, businessName, recipientType);
  const title =
    recipientType === "provider" ? "Booking update" : "Booking confirmation";

  const rows = [
    { label: "Business", value: businessName },
    { label: "Service", value: serviceName },
    { label: "Customer", value: booking.customerName },
    { label: "Customer email", value: booking.customerEmail },
    { label: "When", value: appointmentTime },
    { label: "Status", value: bookingStatus },
    { label: "Payment", value: paymentStatus },
    { label: "Amount", value: amount },
    { label: "Booking ID", value: String(booking._id || "") },
  ];

  const text = [
    intro,
    "",
    ...rows.map((row) => `${row.label}: ${row.value}`),
    booking.notes ? `Notes: ${booking.notes}` : "",
    booking.customerCalendarUrl
      ? `Calendar link: ${booking.customerCalendarUrl}`
      : "",
    "",
    recipientType === "provider"
      ? "This notification was sent by Appointly."
      : `Thank you for booking with ${businessName}.`,
  ]
    .filter(Boolean)
    .join("\n");

  const htmlContent = buildCompanyEmailHtml({
    title,
    eyebrow: businessName,
    intro,
    rows,
    accent: business.brandAccent || "#2DD4BF",
    notes: booking.notes,
    calendarUrl:
      recipientType === "customer" ? booking.customerCalendarUrl : "",
    footer:
      recipientType === "provider"
        ? "This notification was sent by Appointly because a customer booked through your booking page."
        : `Thank you for booking with ${businessName}. Please keep this email for your records.`,
  });

  return { subject, text, htmlContent };
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

/* -------- Exposes the Brevo transactional email sender. -------- */
export const sendTransactionalEmail = sendWithBrevo;
