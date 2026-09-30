export const port = process.env.PORT;

export const mongodbUri = process.env.MONGODB_URI;

export const projectName = process.env.PROJECT_NAME;

export const timeZone = process.env.TIME_ZONE;

export const jwtSecret = process.env.JWT_SECRET;

export const jwtSecretExpiresIn = process.env.JWT_SECRET_EXPIRES_IN;

export const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const maxOtpAttempts = Number(process.env.MAX_OTP_ATTEMPTS);

export const otpTtlMinutes = Number(process.env.OTP_TTL_MINUTES);

export const emailFrom = process.env.EMAIL_FROM;

export const brevoSenderEmail = process.env.BREVO_SENDER_EMAIL;

export const brevoSenderName = process.env.BREVO_SENDER_NAME;

export const brevoTransactionalEmailUrl =
  process.env.BREVO_TRANSACTIONAL_EMAIL_URL;

export const brevoApiKey = process.env.BREVO_API_KEY;

export const googleClientId = process.env.GOOGLE_CLIENT_ID;

export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

export const googleRedirectUri = process.env.GOOGLE_REDIRECT_URI;

export const googleCalendarScope = process.env.GOOGLE_CALENDAR_SCOPE;

export const clientUrl = process.env.CLIENT_URL;

export const currency = process.env.CURRENCY;

export const googleCalendarUrl = process.env.GOOGLE_CALENDAR_URL;

export const adminEmail = process.env.ADMIN_EMAIL;

export const adminPassword = process.env.ADMIN_PASSWORD;

export const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

export const currencyCode = process.env.CURRENCY_CODE;

export const locale = process.env.LOCALE;

export const platformFeeRate = Number(process.env.PLATFORM_FEE_RATE);
