// Client / src / pages / BookingSuccessPage / Components / BookingSuccessActions.jsx
import { ArrowLeft, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const BookingSuccessActions = ({ booking, slug }) => {
  return (
    <>
      {booking?.customerCalendarUrl && (
        <a
          href={booking.customerCalendarUrl}
          target="_blank"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-linear-to-b from-[#CBB8FF] via-[#9B7BFF] to-[#7D57F5] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
        >
          <Calendar className="h-4 w-4" /> Add to Google Calendar
        </a>
      )}

      <Link
        to={slug ? `/book/${slug}` : "/"}
        className="mt-4 flex items-center justify-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#7D57F5]"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Booking Page
      </Link>
    </>
  );
};

export default BookingSuccessActions;
