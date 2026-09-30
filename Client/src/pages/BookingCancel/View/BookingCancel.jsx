import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { cancelBookingPayment } from "../Services/BookingCancelServices";
import BookingCancelHeader from "../Components/BookingCancelHeader";
import BookingCancelActions from "../Components/BookingCancelActions";

const BookingCancel = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const bookingId = searchParams.get("booking_id");

    if (bookingId) {
      cancelBookingPayment(bookingId).catch(() => {});
    }
  }, [searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4F4F5] px-5 py-10 text-gray-900">
      <main className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <BookingCancelHeader />

        <BookingCancelActions slug={searchParams.get("slug")} />
      </main>
    </div>
  );
};

export default BookingCancel;
