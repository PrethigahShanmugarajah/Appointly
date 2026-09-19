// Client / src / pages / BookingsPage / Components / BookingFilters.jsx
import { CalendarDays } from "lucide-react";
import { P7 } from "../../../assets/assets";
import { getStatusOptions } from "../../../utils/bookings";
import { InputField } from "../../../components/FormField/InputField";
import { SelectInput } from "../../../components/FormField/SelectInput";

const BookingFilters = ({ filters, setFilters }) => {
  const statusOptions = getStatusOptions();

  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-8">
      <div className="flex items-start gap-8">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#8b5cf6] mb-3">
            Bookings
          </p>

          <h1 className="text-[28px] md:text-[32px] font-extrabold tracking-tight text-[#0D0E2A] leading-tight">
            Manage Customer{" "}
            <span className="bg-linear-to-b from-[#CBB8FF] via-[#9B7BFF] to-[#7D57F5] bg-clip-text text-transparent custom-brand-font text-[32px] md:text-[38px] relative top-0.5">
              appointments
            </span>
          </h1>

          <p className="mt-3 text-[14px] font-medium text-slate-500">
            View, manage, and keep track of all your customer appointments,
            including booking details, schedules, status, and rescheduling
            updates.
          </p>
        </div>

        <div className="hidden lg:block h-48 w-48 shrink-0 -mt-2">
          <img
            src={P7}
            className="w-full h-full object-contain drop-shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
        <div className="w-full sm:w-55">
          <InputField
            type="date"
            name="bookingDate"
            placeholder="Select Date"
            size="m"
            value={filters.date}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, date: event.target.value }))
            }
            iconLeft={<CalendarDays className="h-4 w-4" />}
            inputClassName="border-slate-200 font-bold text-slate-700 focus:border-[#8b5cf6] focus:ring-[#8b5cf6]"
          />
        </div>

        <div className="w-full sm:w-48">
          <SelectInput
            options={statusOptions}
            placeholder="All Statuses"
            size="m"
            value={filters.status}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, status: value }))
            }
          />
        </div>
      </div>
    </section>
  );
};

export default BookingFilters;
