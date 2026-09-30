import {
  Calendar,
  CalendarDays,
  Check,
  Clock,
  CreditCard,
  ExternalLink,
  RefreshCcw,
  XCircle,
} from "lucide-react";
import { AVATAR_MAP } from "../../../utils/avatarMap";
import { formatTimestamp } from "../../../utils/date";
import { useAppContext } from "../../../context/appContext";

const BookingCard = ({
  booking,
  setRescheduleModalBooking,
  setCancelModalBookingId,
}) => {
  const { VITE_LOCALE } = useAppContext();

  return (
    <article
      key={booking._id}
      className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-md relative"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        {/* -------- Left: booking info -------- */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-extrabold tracking-wide uppercase ${
                {
                  confirmed: "bg-[#EFF6FF] text-[#2563EB]",
                  cancelled: "bg-[#FEF2F2] text-[#DC2626]",
                  pending: "bg-[#FFF7ED] text-[#EA580C]",
                  pending_payment: "bg-[#CFFAFE] text-[#0D9488]",
                  payment_failed: "bg-[#FFF1F2] text-[#E11D48]",
                }[booking.status] || "bg-gray-50 text-gray-600"
              }`}
            >
              <Check className="h-3.5 w-3.5" />
              {booking.status.replace("_", " ")}
            </span>

            <span
              className={`flex items-center gap-1.5 rounded-[10px] px-3.5 py-1.5 text-[11px] font-extrabold tracking-wide uppercase ${
                {
                  paid: "bg-[#F0FDF4] text-[#16A34A]",
                  not_required: "bg-[#FFFBEB] text-[#D97706]",
                }[booking.paymentStatus] || "bg-gray-50 text-gray-600"
              }`}
            >
              <CreditCard className="h-3.5 w-3.5" />
              Payment:{" "}
              {booking.paymentStatus?.replace("_", " ") || "Not Required"}
            </span>

            {booking.rescheduleCount > 0 && (
              <span className="flex items-center gap-1.5 rounded-[10px] px-3.5 py-1.5 text-[11px] font-extrabold tracking-wide uppercase bg-amber-100 text-amber-700 ml-2">
                <RefreshCcw className="h-3.5 w-3.5" />
                Rescheduled ({booking.rescheduleCount})
              </span>
            )}
          </div>

          <div className="mt-7 flex items-center gap-4">
            <div className="flex h-13 w-13 items-center justify-center rounded-full bg-gray-100 shadow-sm overflow-hidden border border-gray-200">
              <img
                src={AVATAR_MAP[booking.customerAvatar || "A1.png"]}
                alt={booking.customerName}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-[18px] font-extrabold text-gray-900 tracking-tight leading-tight mb-0.5">
                {booking.customerName}
              </h2>

              <p className="text-[13px] font-medium text-gray-500">
                {booking.customerEmail}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 mt-7">
            <div className="w-11 h-11 rounded-xl bg-[#E0F7FA] flex items-center justify-center shrink-0">
              <CalendarDays className="w-5 h-5 text-[#14B8A6]" />
            </div>

            <div className="pt-0.5 flex-1 w-full overflow-hidden">
              <p className="text-[14px] md:text-[15px] font-extrabold text-[#111827] leading-tight mb-1.5 wrap-break-word">
                {booking.date} • {booking.startTime} - {booking.endTime}
              </p>

              <div className="flex items-center gap-2 flex-wrap">
                <div className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]"></div>

                <p className="text-[12px] font-bold text-gray-500 tracking-wide">
                  {booking.serviceId?.name || "Meeting"}
                  {booking.notes ? ` • ${booking.notes}` : " • GGH"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 md:gap-5 text-[11px] font-extrabold uppercase text-gray-400 tracking-wide">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Created: {formatTimestamp(booking.createdAt, VITE_LOCALE)}
            </span>

            <span className="flex items-center gap-1.5">
              <RefreshCcw className="w-3.5 h-3.5" />
              Last updated: {formatTimestamp(booking.updatedAt, VITE_LOCALE)}
            </span>
          </div>

          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-extrabold uppercase text-gray-400 tracking-wide">
            <Calendar className="w-3.5 h-3.5" />
            Calendar:{" "}
            {booking.googleEventId ? "Synced to Google" : "Not synced"}
          </div>

          {booking.customerCalendarUrl ? (
            <a
              href={booking.customerCalendarUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-bold text-[#0891B2] hover:underline pb-2"
            >
              Customer calendar link
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : (
            <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-bold text-gray-400 pb-2 cursor-not-allowed">
              Calendar link unavailable
              <ExternalLink className="h-3.5 w-3.5" />
            </span>
          )}
        </div>

        {/* -------- Right: action buttons -------- */}
        <div className="flex flex-col gap-4 lg:w-auto pt-2 justify-center">
          <div className="flex flex-wrap sm:flex-nowrap gap-3 mt-1.5 ml-1">
            {booking.status !== "cancelled" &&
              booking.status !== "payment_failed" && (
                <>
                  <button
                    type="button"
                    onClick={() => setRescheduleModalBooking(booking)}
                    className="flex flex-1 sm:flex-none items-center justify-center gap-1.5 rounded-full bg-[#F1F5F9] px-4 py-2.5 text-[12px] font-extrabold tracking-wide text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <CalendarDays className="h-3.5 w-3.5" />
                    Reschedule
                  </button>

                  <button
                    type="button"
                    onClick={() => setCancelModalBookingId(booking._id)}
                    className="flex flex-1 sm:flex-none items-center justify-center gap-1.5 rounded-full bg-[#FEF2F2] px-4 py-2.5 text-[12px] font-extrabold tracking-wide text-[#DC2626] hover:bg-[#FEE2E2] transition-colors"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    Cancel
                  </button>
                </>
              )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BookingCard;
