// Client / src / api/ api_route.js

const API_ROUTES = {
  AUTH: {
    BASE: "/auth",
    REGISTER: "/auth/register",
    REQUEST_OTP: "/auth/request-otp",
    VERIFY_OTP: "/auth/verify-otp",
    LOGIN: "/auth/login",
    GET_ME: "/auth/me",
    UPDATE_PROFILE: "/auth/profile",
  },
  SERVICE: {
    BASE: "/services",
  },
  AVAILABILITY: {
    BASE: "/availability",
  },
  INTEGRATION: {
    GOOGLE_CONNECT: "/integrations/google/connect",
    GOOGLE_CALLBACK: "/integrations/google/callback",
  },
  BOOKING: {
    BASE: "/bookings",
    UPDATE_STATUS: (id) => `/bookings/${id}`,
    RESCHEDULE: (id) => `/bookings/${id}/reschedule`,
  },
  PAYMENT: {
    BASE: "/payments",
    PAYOUT_DETAILS: "/payments/payout-details",
    WITHDRAWALS: "/payments/withdrawals",
  },
  PUBLIC: {
    BUSINESS: (slug) => `/public/${slug}`,
    SLOTS: (slug) => `/public/${slug}/slots`,
    REQUEST_OTP: (slug) => `/public/${slug}/request-otp`,
    VERIFY_OTP: (slug) => `/public/${slug}/verify-otp`,
    CREATE_BOOKING: (slug) => `/public/${slug}/book`,
    BOOKING_STATUS: "/public/booking/status",
    CANCEL_PAYMENT: "/public/booking/cancel-payment",
  },
  ADMIN: {
    LOGIN: "/admin/login",
    DASHBOARD: "/admin/dashboard",
    UPDATE_WITHDRAWAL: (id) => `/admin/withdrawals/${id}`,
  },
};

export default API_ROUTES;
