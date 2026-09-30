/* eslint-disable no-unused-vars */
import { BadgeCheck, CalendarDays, Clock, Sun } from "lucide-react";
import { P4 } from "../../../assets/assets";
import { days } from "../../../utils/availability";

const dayIcons = [
  Sun,
  CalendarDays,
  CalendarDays,
  CalendarDays,
  CalendarDays,
  CalendarDays,
  Sun,
];

const AvailabilityDaySelector = ({
  availability,
  selectedDay,
  setSelectedDay,
  setSlots,
  getSlotsForDays,
}) => {
  return (
    <section>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2DD4BF]">
            Availability
          </p>

          <h1 className="mt-2 text-[28px] md:text-[36px] font-extrabold leading-[1.1] tracking-tight text-[#164E63]">
            Set the hours customers can{" "}
            <span className="bg-linear-to-b from-[#FED7AA] via-[#F97316] to-[#EA580C] bg-clip-text text-transparent custom-brand-font text-[32px] md:text-[42px] relative top-0 md:top-1 ml-1 md:ml-2 line-clamp-1">
              choose.
            </span>{" "}
          </h1>

          <p className="mt-2 max-w-sm text-sm text-gray-500">
            Keep it simple: select a weekday, add one or more time windows, then
            save.
          </p>
        </div>

        <div className="hidden lg:block h-48 w-48 shrink-0">
          <img
            src={P4}
            className="w-full h-full object-contain drop-shadow-sm"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-3">
        {days.map((day, index) => {
          const Icon = dayIcons[index];
          const isSelected = selectedDay === index;
          const hasSaved = availability.some(
            (item) => item.dayOfWeek === index && item.slots.length > 0,
          );

          return (
            <button
              key={day}
              type="button"
              onClick={() => {
                setSelectedDay(index);
                setSlots(getSlotsForDays(availability, index));
              }}
              className={
                isSelected
                  ? "flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all border-[#2DD4BF] bg-[#F0FDFA] shadow-sm ring-2 ring-[#2DD4BF]/20"
                  : "flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all border-gray-200 bg-white hover:border-gray-300"
              }
            >
              <div className="flex items-center gap-3">
                <div
                  className={
                    isSelected
                      ? "flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-b from-[#99F6E4] via-[#5EEAD4] to-[#2DD4BF] text-white"
                      : "flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500"
                  }
                >
                  <Icon className="h-4 w-4" />
                </div>

                <span
                  className={
                    isSelected
                      ? "text-sm font-semibold text-[#2DD4BF]"
                      : "text-sm font-semibold text-gray-700"
                  }
                >
                  {day}
                </span>
              </div>

              {isSelected ? (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-b from-[#99F6E4] via-[#5EEAD4] to-[#2DD4BF]">
                  <BadgeCheck className="h-4 w-4 text-white" />
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-2xl bg-gray-50 px-5 py-4">
        <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" />

        <p className="text-sm text-gray-500">
          Customers will only see{" "}
          <span className="font-semibold text-gray-700">available days</span>
          and times when booking.{" "}
        </p>
      </div>
    </section>
  );
};

export default AvailabilityDaySelector;
