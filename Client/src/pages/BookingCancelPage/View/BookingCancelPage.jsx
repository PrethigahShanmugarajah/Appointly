// Client / src / pages / BookingCancelPage / View / BookingCancelPage.jsx
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { cancelBookingPayment } from "../Services/BookingCancelPageServices";
import BookingCancelHeader from "../Components/BookingCancelHeader";
import BookingCancelActions from "../Components/BookingCancelActions";

const BookingCancelPage = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const bookingId = searchParams.get("booking_id");

    if (bookingId) {
      cancelBookingPayment(bookingId).catch(() => {});
    }
  }, [searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f9fc] px-5 py-10 text-slate-900">
      <main className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <BookingCancelHeader />

        <BookingCancelActions slug={searchParams.get("slug")} />
      </main>
    </div>
  );
};

export default BookingCancelPage;
