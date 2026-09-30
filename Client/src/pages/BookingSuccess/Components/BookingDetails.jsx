import { CalendarDays } from "lucide-react";
import { formatBookingStatus } from "../../../utils/bookings";

const BookingDetails = ({ booking }) => {
  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5 text-left">
      <div className="flex items-center gap-2">
        <CalendarDays className="h-4 w-4 text-[#2DD4BF]" />

        <p className="font-semibold text-gray-900">
          {booking.serviceId?.name || "Appointment"}
        </p>
      </div>

      <p className="mt-1.5 text-sm text-gray-500">
        {booking.date} • {booking.startTime}-{booking.endTime}
      </p>

      <p className="mt-1 text-sm capitalize text-gray-500">
        Status: {formatBookingStatus(booking.status)}
      </p>
    </div>
  );
};

export default BookingDetails;
