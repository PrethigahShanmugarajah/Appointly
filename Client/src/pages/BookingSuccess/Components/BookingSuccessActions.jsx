import { ArrowLeft, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const BookingSuccessActions = ({ booking, slug }) => {
  return (
    <>
      {booking?.customerCalendarUrl && (
        <a
          href={booking.customerCalendarUrl}
          target="_blank"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-linear-to-b from-[#99F6E4] via-[#5EEAD4] to-[#2DD4BF] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
        >
          <Calendar className="h-4 w-4" /> Add to Google Calendar
        </a>
      )}

      <Link
        to={slug ? `/book/${slug}` : "/"}
        className="mt-4 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#2DD4BF]"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Booking Page
      </Link>
    </>
  );
};

export default BookingSuccessActions;
