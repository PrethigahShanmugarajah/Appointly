// Client / src / pages / BookingCancelPage / Components / BookingCancelHeader.jsx
import { XCircle } from "lucide-react";

const BookingCancelHeader = () => {
  return (
    <>
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
        <XCircle className="h-8 w-8 text-rose-600" />
      </div>

      <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-rose-600">
        Payment Cancelled.
      </p>

      <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
        Your booking was not confirmed.
      </h1>

      <p className="mt-3 text-sm text-slate-500">
        No payment was completed. You can return to the bookings page and choose
        a slot again.
      </p>
    </>
  );
};

export default BookingCancelHeader;
