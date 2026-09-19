// Client / src / pages / BookingsPage / Services / BookingsPageServices.jsx
import { listBookings } from "../../../services/fetch";
import {
  rescheduleBooking,
  updateBookingStatus,
} from "../../../services/mutation";

/* -------- Fetch bookings -------- */
export const fetchBookings = async (nextFilters, setBookings) => {
  const params = {};

  if (nextFilters.date) params.date = nextFilters.date;
  if (nextFilters.status) params.status = nextFilters.status;

  const { data } = await listBookings(params);
  setBookings(data.bookings || []);
};

/* -------- Load bookings -------- */
export const loadBookings = (filters, setBookings) =>
  fetchBookings(filters, setBookings);

/* -------- Update booking status -------- */
export const setStatus = async (booking, status, filters, setBookings) => {
  await updateBookingStatus(booking._id, status);
  loadBookings(filters, setBookings);
};

/* -------- Update reschedule draft -------- */
export const updateRescheduleDraft = (booking, key, value, setReschedules) => {
  setReschedules((prev) => ({
    ...prev,
    [booking._id]: {
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      ...prev[booking._id],
      [key]: value,
    },
  }));
};

/* -------- Submit reschedule -------- */
export const submitReschedule = async (
  booking,
  reschedules,
  setReschedules,
  filters,
  setBookings,
) => {
  const draft = {
    date: booking.date,
    startTime: booking.startTime,
    endTime: booking.endTime,
    ...reschedules[booking._id],
  };

  await rescheduleBooking(booking._id, draft);

  setReschedules((prev) => ({
    ...prev,
    [booking._id]: undefined,
  }));

  loadBookings(filters, setBookings);
};
