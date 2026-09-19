// Client / src / pages / BookingsPage / Components / RescheduleBookingModal.jsx
import { CalendarDays, Clock, XCircle } from "lucide-react";

const RescheduleBookingModal = ({
  rescheduleModalBooking,
  setRescheduleModalBooking,
  reschedules,
  setReschedules,
  updateRescheduleDraft,
  submitReschedule,
  filters,
  setBookings,
}) => {
  if (!rescheduleModalBooking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Reschedule Booking
          </h2>

          <button
            onClick={() => {
              setRescheduleModalBooking(null);
              setReschedules((prev) => ({
                ...prev,
                [rescheduleModalBooking._id]: undefined,
              }));
            }}
            className="text-slate-400 hover:text-slate-600 transition-colors rounded-lg p-1 hover:bg-slate-100"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="flex flex-col gap-4">
            <div className="relative w-full">
              <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                value={
                  reschedules[rescheduleModalBooking._id]?.date ??
                  rescheduleModalBooking.date
                }
                onChange={(event) =>
                  updateRescheduleDraft(
                    rescheduleModalBooking,
                    "date",
                    event.target.value,
                    setReschedules,
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]"
              />
            </div>

            <div className="relative w-full">
              <Clock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="time"
                value={
                  reschedules[rescheduleModalBooking._id]?.startTime ??
                  rescheduleModalBooking.startTime
                }
                onChange={(event) =>
                  updateRescheduleDraft(
                    rescheduleModalBooking,
                    "startTime",
                    event.target.value,
                    setReschedules,
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]"
              />
            </div>

            <div className="relative w-full">
              <Clock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="time"
                value={
                  reschedules[rescheduleModalBooking._id]?.endTime ??
                  rescheduleModalBooking.endTime
                }
                onChange={(event) =>
                  updateRescheduleDraft(
                    rescheduleModalBooking,
                    "endTime",
                    event.target.value,
                    setReschedules,
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]"
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button
            onClick={() => {
              setRescheduleModalBooking(null);
              setReschedules((prev) => ({
                ...prev,
                [rescheduleModalBooking._id]: undefined,
              }));
            }}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-xl transition-colors"
          >
            Discard
          </button>

          <button
            onClick={() => {
              submitReschedule(
                rescheduleModalBooking,
                reschedules,
                setReschedules,
                filters,
                setBookings,
              );
              setRescheduleModalBooking(null);
            }}
            className="px-4 py-2 text-sm font-semibold text-white bg-[#09090b] hover:bg-slate-800 rounded-xl transition-colors shadow-sm"
          >
            Confirm Reschedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleBookingModal;
