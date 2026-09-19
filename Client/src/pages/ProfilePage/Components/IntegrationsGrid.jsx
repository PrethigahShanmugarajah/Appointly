// Client / src / pages / ProfilePage / Components / IntegrationsGrid.jsx
import { BadgeCheck } from "lucide-react";
import { Gmail, Google_Calendar, Stripe } from "../../../assets/assets";
import { ThreeDots } from "react-loader-spinner";

const IntegrationsGrid = ({
  connectGoogleCalendar,
  connectingCalendar,
  googleCalendarConnected,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <div className="bg-white rounded-[18px] border border-slate-200 p-5 shadow-sm text-center sm:text-left flex flex-col min-h-44.5">
        <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white shadow-sm overflow-hidden border border-slate-100">
            <img
              src={Stripe}
              alt="Stripe"
              className="w-[120%] h-[120%] object-contain"
            />
          </div>

          <span className="text-[13px] font-semibold text-slate-500">
            Stripe
          </span>
        </div>

        <h4 className="text-[15px] font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2 mb-2">
          Configured{" "}
          <BadgeCheck className="w-4 h-4 text-emerald-500 fill-emerald-50" />
        </h4>

        <p className="text-[13px] text-slate-500 mb-5 grow leading-relaxed">
          Collect payments securely via Stripe.
        </p>

        <div className="mt-auto flex min-h-10 w-full items-center justify-center rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-[12px] font-semibold text-slate-600 sm:justify-start">
          Platform payment gateway
        </div>
      </div>

      <div className="bg-white rounded-[18px] border border-slate-200 p-5 shadow-sm text-center sm:text-left flex flex-col min-h-44.5">
        <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white shadow-sm overflow-hidden border border-slate-100">
            <img
              src={Google_Calendar}
              alt="Calendar"
              className="w-[120%] h-[120%] object-contain"
            />
          </div>

          <span className="text-[13px] font-semibold text-slate-500">
            Calendar
          </span>
        </div>

        <h4 className="text-[15px] font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2 mb-2">
          {googleCalendarConnected ? "Connected" : "Not connected"}{" "}
          {googleCalendarConnected && (
            <BadgeCheck className="w-4 h-4 text-emerald-500 fill-emerald-50" />
          )}
        </h4>

        <p className="text-[13px] text-slate-500 mb-5 grow leading-relaxed">
          {googleCalendarConnected
            ? "Bookings will sync automatically."
            : "Connect your Google Calendar to sync bookings."}
        </p>

        <button
          onClick={connectGoogleCalendar}
          disabled={connectingCalendar}
          className="mt-auto min-h-10 w-full flex items-center justify-center py-2.5 rounded-xl border border-indigo-100 text-indigo-600 text-[13px] font-semibold bg-indigo-50/50 hover:bg-indigo-50 transition-colors disabled:opacity-60"
        >
          {connectingCalendar ? (
            <ThreeDots
              height="20"
              width="30"
              radius="9"
              color="currentColor"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          ) : googleCalendarConnected ? (
            "Connected"
          ) : (
            "Connect"
          )}
        </button>
      </div>

      <div className="bg-white rounded-[18px] border border-slate-200 p-5 shadow-sm text-center sm:text-left flex flex-col min-h-44.5">
        <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white shadow-sm overflow-hidden border border-slate-100">
            <img
              src={Gmail}
              alt="Emails"
              className="w-[120%] h-[120%] object-contain"
            />
          </div>

          <span className="text-[13px] font-semibold text-slate-500">
            Emails
          </span>
        </div>

        <h4 className="text-[15px] font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2 mb-2">
          Configured{" "}
          <BadgeCheck className="w-4 h-4 text-emerald-500 fill-emerald-50" />
        </h4>

        <p className="text-[13px] text-slate-500 mb-5 grow leading-relaxed">
          Customers receive email updates.
        </p>

        <div className="mt-auto flex min-h-10 w-full items-center justify-center rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-[12px] font-semibold text-slate-600 sm:justify-start">
          Automatic booking emails
        </div>
      </div>
    </div>
  );
};

export default IntegrationsGrid;
