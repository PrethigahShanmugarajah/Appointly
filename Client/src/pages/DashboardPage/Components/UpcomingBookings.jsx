// Client / src / pages / DashboardPage / Components / UpcomingBookings.jsx
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import {
  A1,
  A10,
  A11,
  A12,
  A13,
  A15,
  A16,
  A2,
  A3,
  A4,
  A5,
  A6,
  A7,
  A8,
  A9,
} from "../../../assets/assets";

const AVATAR_MAP = {
  "A1.png": A1,
  "A2.png": A2,
  "A3.png": A3,
  "A4.png": A4,
  "A5.png": A5,
  "A6.png": A6,
  "A7.png": A7,
  "A8.png": A8,
  "A9.png": A9,
  "A10.png": A10,
  "A11.png": A11,
  "A12.png": A12,
  "A13.png": A13,
  "A15.png": A15,
  "A16.png": A16,
};

const UpcomingBookings = ({ upcomingBookings }) => {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.04)] flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[16px] font-bold text-slate-900">
          Upcoming Bookings
        </h3>

        <Link
          to="/bookings"
          className="px-4 py-1.5 bg-white text-slate-600 hover:text-slate-900 text-[12px] font-bold rounded-full border border-slate-200 shadow-sm"
        >
          View all
        </Link>
      </div>

      <div className="space-y-5 mt-2 flex-1">
        {upcomingBookings.map((booking) => {
          const isConfirmed = booking.status === "confirmed";
          const badgeColors = isConfirmed
            ? "bg-[#eafbef] text-[#16a34a]"
            : "bg-[#ffedd5] text-[#ea580c]";
          const date = booking.displayDate;

          return (
            <div
              key={booking._id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10.5 h-10.5 rounded-full bg-slate-100 shadow-sm overflow-hidden border border-slate-200">
                  <img
                    src={AVATAR_MAP[booking.customerAvatar || "A1.png"]}
                    alt={booking.customerName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <p className="font-bold text-slate-900 text-[14px]">
                    {booking.customerName || "Guest"}
                  </p>

                  <p className="text-[12px] text-slate-500 font-medium mt-0.5">
                    {booking.service?.name || "Service"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="hidden sm:block text-right">
                  <div className="flex items-center justify-end gap-1.5 text-[12px] text-slate-500 font-medium whitespace-nowrap">
                    <Calendar className="w-3.5 h-3.5" />{" "}
                    {date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>

                  <div className="flex items-center justify-end gap-1.5 text-[12px] text-slate-500 font-medium mt-1.5 whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5" />{" "}
                    {booking.startTime && booking.endTime
                      ? `${booking.startTime} - ${booking.endTime}`
                      : date.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                  </div>
                </div>

                <span
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold min-w-20 text-center ${badgeColors}`}
                >
                  {isConfirmed ? "Confirmed" : "Pending"}
                </span>
              </div>
            </div>
          );
        })}

        {upcomingBookings.length === 0 && (
          <p className="text-[13px] font-medium text-slate-500 text-center pt-8">
            No upcoming bookings.
          </p>
        )}
      </div>
    </div>
  );
};

export default UpcomingBookings;
