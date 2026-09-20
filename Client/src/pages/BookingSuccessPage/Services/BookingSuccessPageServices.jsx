// Client / src / pages / BookingSuccessPage / Services / BookingSuccessPageServices.jsx
import { getPublicBookingStatus } from "../../../services/fetch";

/* -------- Fetch public booking status -------- */
export const fetchBookingStatus = async (sessionId) => {
  const { data } = await getPublicBookingStatus({
    session_id: sessionId,
  });

  const booking = data.booking;

  return booking;
};
