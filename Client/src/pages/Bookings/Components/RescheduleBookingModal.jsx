import { CalendarDays, Clock, XCircle } from "lucide-react";
import { InputField } from "../../../components/FormField/InputField";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
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
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-lg p-1 hover:bg-gray-100"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="flex flex-col gap-4">
            <InputField
              type="date"
              size="m"
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
              iconLeft={<CalendarDays className="h-4 w-4" />}
            />

            <InputField
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
              iconLeft={<Clock className="h-4 w-4" />}
            />

            <InputField
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
              iconLeft={<Clock className="h-4 w-4" />}
            />
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={() => {
              setRescheduleModalBooking(null);
              setReschedules((prev) => ({
                ...prev,
                [rescheduleModalBooking._id]: undefined,
              }));
            }}
            className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-200 bg-gray-100 rounded-xl transition-colors"
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
            className="px-4 py-2 text-sm font-semibold text-white bg-[#09090B] hover:bg-gray-800 rounded-xl transition-colors shadow-sm"
          >
            Confirm Reschedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleBookingModal;
