// Client / src / pages / DashboardPage / Components / BookingOverview.jsx
import { SelectInput } from "../../../components/FormField/SelectInput";
import LineChart from "./LineChart";
import StatusPanel from "./StatusPanel";

const BookingOverview = ({
  bookingTrend,
  graphFilter,
  setGraphFilter,
  confirmedBookings,
  rescheduledBookings,
  cancelledBookings,
}) => {
  const graphFilterOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.75fr_1fr] gap-6">
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <h3 className="text-[16px] font-bold text-slate-900">
            Booking Overview
          </h3>

          <div className="ml-auto">
            <SelectInput
              options={graphFilterOptions}
              value={graphFilter}
              onChange={setGraphFilter}
              isClearable={false}
              selectClassName="w-28"
            />
          </div>
        </div>

        <div className="overflow-x-auto overflow-y-hidden md:overflow-visible">
          <div className="min-w-150 md:min-w-0">
            <LineChart data={bookingTrend} accent="#7D57F5" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.04)]">
        <h3 className="text-[16px] font-bold text-slate-900">
          Bookings by Status
        </h3>

        <div className="mt-7.5">
          <StatusPanel
            confirmed={confirmedBookings.length}
            rescheduled={rescheduledBookings.length}
            cancelled={cancelledBookings.length}
          />
        </div>
      </div>
    </section>
  );
};

export default BookingOverview;
