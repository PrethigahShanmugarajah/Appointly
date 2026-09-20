// Client / src / pages / BookingSuccessPage / View / BookingSuccessPage.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchBookingStatus } from "../Services/BookingSuccessPageServices";
import BookingVerificationHeader from "../Components/BookingVerificationHeader";
import BookingDetails from "../Components/BookingDetails";
import BookingSuccessActions from "../Components/BookingSuccessActions";

const BookingSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const loadBooking = async () => {
      const sessionId = searchParams.get("session_id");

      if (!sessionId) {
        toast.warn("We could not verify the payment. No booking was created.");

        return;
      }

      try {
        const booking = await fetchBookingStatus(sessionId);

        setBooking(booking);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "We could not verify the payment. No booking was created.",
        );
      }
    };

    loadBooking();
  }, [searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f9fc] px-5 py-10 text-slate-900">
      <main className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <BookingVerificationHeader />

        {booking && <BookingDetails booking={booking} />}

        <BookingSuccessActions
          booking={booking}
          slug={searchParams.get("slug")}
        />
      </main>
    </div>
  );
};

export default BookingSuccessPage;
