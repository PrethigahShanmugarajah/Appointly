// Server / config / env.js

export const port = process.env.PORT;

export const mongodbUri = process.env.MONGODB_URI;

export const projectName = process.env.PROJECT_NAME;

export const timeZone = process.env.TIME_ZONE;

export const jwtSecret = process.env.JWT_SECRET;

export const jwtSecretExpiresIn = process.env.JWT_SECRET_EXPIRES_IN;

export const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const maxOtpAttempts = Number(process.env.MAX_OTP_ATTEMPTS);
