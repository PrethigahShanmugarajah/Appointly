// Client / src / pages / BookingsPage / Components / CancelBookingModal.jsx
import { XCircle } from "lucide-react";

const CancelBookingModal = (
  cancelModalBookingId,
  setCancelModalBookingId,
  filters,
  setBookings,
  setStatus,
) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Cancel Booking</h2>

          <button
            onClick={() => setCancelModalBookingId(null)}
            className="text-slate-400 hover:text-slate-600 transition-colors rounded-lg p-1 hover:bg-slate-100"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="text-sm text-slate-600 mb-6">
            Are you sure you want to cancel this booking? This action cannot be
            undone, and the customer will be notified.
          </p>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button
            onClick={() => setCancelModalBookingId(null)}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-xl transition-colors"
          >
            Keep Booking
          </button>

          <button
            onClick={() => {
              setStatus(
                { _id: cancelModalBookingId },
                "cancelled",
                filters,
                setBookings,
              );
              setCancelModalBookingId(null);
            }}
            className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-sm"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;
