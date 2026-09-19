// Client / src / pages / BookingsPage / View / BookingsPage.jsx
import { useEffect, useState } from "react";
import {
  fetchBookings,
  setStatus,
  submitReschedule,
  updateRescheduleDraft,
} from "../Services/BookingsPageServices";
import AppLayout from "../../../components/AppLayout";
import BookingFilters from "../Components/BookingFilters";
import { CalendarDays } from "lucide-react";
import BookingCard from "../Components/BookingCard";
import CancelBookingModal from "../Components/CancelBookingModal";
import RescheduleBookingModal from "../Components/RescheduleBookingModal";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({ date: "", status: "" });
  const [reschedules, setReschedules] = useState({});
  const [cancelModalBookingId, setCancelModalBookingId] = useState(null);
  const [rescheduleModalBooking, setRescheduleModalBooking] = useState(null);

  useEffect(() => {
    const loadFilteredBookings = async () => {
      await fetchBookings(filters, setBookings);
    };
    loadFilteredBookings();
  }, [filters]);

  return (
    <AppLayout>
      <BookingFilters filters={filters} setFilters={setFilters} />

      {/* -------- Booking cards -------- */}
      <section className="space-y-5 pb-12">
        {bookings.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <CalendarDays className="mx-auto h-12 w-12 text-slate-300 mb-4" />

            <p className="text-[14px] font-bold text-slate-500">
              No bookings match these filters.
            </p>
          </div>
        )}

        {bookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            setRescheduleModalBooking={setRescheduleModalBooking}
            setCancelModalBookingId={setCancelModalBookingId}
          />
        ))}
      </section>

      {/* -------- Modals -------- */}
      {cancelModalBookingId && (
        <CancelBookingModal
          cancelModalBookingId={cancelModalBookingId}
          setCancelModalBookingId={setCancelModalBookingId}
          filters={filters}
          setBookings={setBookings}
          setStatus={setStatus}
        />
      )}

      {rescheduleModalBooking && (
        <RescheduleBookingModal
          rescheduleModalBooking={rescheduleModalBooking}
          setRescheduleModalBooking={setRescheduleModalBooking}
          reschedules={reschedules}
          setReschedules={setReschedules}
          updateRescheduleDraft={updateRescheduleDraft}
          submitReschedule={submitReschedule}
          filters={filters}
          setBookings={setBookings}
        />
      )}
    </AppLayout>
  );
};

export default BookingsPage;
