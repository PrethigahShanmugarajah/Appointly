import { cancelPublicBookingPayments } from "../../../services/mutation";

/* -------- Cancel public booking payment -------- */
export const cancelBookingPayment = async (bookingId) => {
  await cancelPublicBookingPayments(bookingId);
};
