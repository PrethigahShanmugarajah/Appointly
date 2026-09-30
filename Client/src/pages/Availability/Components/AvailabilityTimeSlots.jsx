import { CalendarDays, Clock, Plus, Save, Trash2 } from "lucide-react";
import { days } from "../../../utils/availability";
import { InputField } from "../../../components/FormField/InputField";
import { ThreeDots } from "react-loader-spinner";

const AvailabilityTimeSlots = ({
  selectedDay,
  currentDaySummary,
  slots,
  loading,
  addSlot,
  updateSlot,
  removeSlot,
  handleSave,
}) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#CCFBF1]">
            <CalendarDays className="h-5 w-5 text-[#2DD4BF]" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {days[selectedDay]}
            </h2>

            <p className="text-sm text-gray-500">
              {currentDaySummary?.slots?.length || 0} saved time{" "}
              {currentDaySummary?.slots?.length === 1 ? "window" : "windows"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={addSlot}
          className="flex items-center gap-1.5 rounded-xl bg-linear-to-b from-[#99F6E4] via-[#5EEAD4] to-[#2DD4BF] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" />
          Add window
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {slots.map((slot, index) => (
          <div
            key={`${index}-${slot.startTime}`}
            className="rounded-2xl border border-gray-200 bg-white p-5"
          >
            <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
              <InputField
                label="Start"
                name={`startTime-${index}`}
                type="time"
                size="s"
                value={slot.startTime}
                onChange={(event) =>
                  updateSlot(index, "startTime", event.target.value)
                }
                iconLeft={<Clock className="h-4 w-4" />}
              />

              <InputField
                label="End"
                name={`endTime-${index}`}
                type="time"
                size="s"
                value={slot.endTime}
                onChange={(event) =>
                  updateSlot(index, "endTime", event.target.value)
                }
                iconLeft={<Clock className="h-4 w-4" />}
              />

              <button
                type="button"
                onClick={() => removeSlot(index)}
                className="flex items-center justify-center sm:justify-start gap-1.5 self-center sm:self-end w-full sm:w-auto mt-2 sm:mt-0 rounded-xl px-4 py-3 text-[13px] sm:text-sm font-semibold text-red-600 hover:bg-red-50 border border-gray-200 sm:border-none"
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addSlot}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#99F6E4] py-4 text-sm font-semibold text-[#2DD4BF] hover:bg-[#F0FDFA]"
      >
        <Plus className="h-4 w-4" />
        Add another time window
      </button>

      <button
        type="button"
        disabled={loading}
        onClick={handleSave}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-b from-[#99F6E4] via-[#5EEAD4] to-[#2DD4BF] px-5 py-3.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {loading ? (
          <ThreeDots
            height="20"
            width="40"
            color="#FFFFFF"
            visible={true}
            ariaLabel="saving"
          />
        ) : (
          <>
            <Save className="h-4 w-4" />
            Save availability
          </>
        )}
      </button>
    </section>
  );
};

export default AvailabilityTimeSlots;
