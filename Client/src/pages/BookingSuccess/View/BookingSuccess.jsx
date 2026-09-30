import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchBookingStatus } from "../Services/BookingSuccessServices";
import BookingVerificationHeader from "../Components/BookingVerificationHeader";
import BookingDetails from "../Components/BookingDetails";
import BookingSuccessActions from "../Components/BookingSuccessActions";

const BookingSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const loadBooking = async () => {
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

        console.error("Booking Success Error:", error);
      }
    };

    loadBooking();
  }, [sessionId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4F4F5] px-5 py-10 text-gray-900">
      <main className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
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

export default BookingSuccess;
