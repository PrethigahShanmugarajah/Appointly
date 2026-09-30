import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const BookingCancelActions = ({ slug }) => {
  return (
    <Link
      to={slug ? `booking/${slug}` : "/"}
      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-linear-to-b from-[#99F6E4] via-[#5EEAD4] to-[#2DD4BF] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Booking Page
    </Link>
  );
};

export default BookingCancelActions;
