import { useEffect, useState } from "react";
import {
  fetchBookings,
  setStatus,
  submitReschedule,
  updateRescheduleDraft,
} from "../Services/BookingsServices";
import AppLayout from "../../../components/AppLayout";
import BookingFilters from "../Components/BookingFilters";
import { CalendarDays } from "lucide-react";
import BookingCard from "../Components/BookingCard";
import ConfirmPopup from "../../../components/ConfirmPopup";
import RescheduleBookingModal from "../Components/RescheduleBookingModal";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({ date: "", status: "" });
  const [reschedules, setReschedules] = useState({});
  const [cancelModalBookingId, setCancelModalBookingId] = useState(null);
  const [rescheduleModalBooking, setRescheduleModalBooking] = useState(null);

  const handleCancelBooking = async () => {
    await setStatus(
      { _id: cancelModalBookingId },
      "cancelled",
      filters,
      setBookings,
    );

    setCancelModalBookingId(null);
  };

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
          <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <CalendarDays className="mx-auto h-12 w-12 text-gray-300 mb-4" />

            <p className="text-[14px] font-bold text-gray-500">
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
        <ConfirmPopup
          onClose={() => setCancelModalBookingId(null)}
          onConfirm={handleCancelBooking}
          title="Cancel Booking"
          description="Are you sure you want to cancel this booking? This action cannot be undone, and the customer will be notified."
          confirmText="Yes, Cancel"
          closeText="Keep Booking"
          confirmColor="red"
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

export default Bookings;
