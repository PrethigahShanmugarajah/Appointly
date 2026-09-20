// Client / src / pages / PublicBooking / Components / BookingForm.jsx
import {
  BadgeCheck,
  CalendarDays,
  Clock,
  Lock,
  Mail,
  Shield,
  User,
} from "lucide-react";
import {
  handlePublicBookingChange,
  sendBookingOtp,
  submitPublicBooking,
} from "../Services/PublicBookingServices";
import { AVATAR_MAP } from "../../../utils/avatarMap";
import { useAppContext } from "../../../context/appContext";
import { InputField } from "../../../components/FormField/InputField";
import { TextAreaField } from "../../../components/FormField/TextAreaField";
import { Oval } from "react-loader-spinner";

const BookingForm = ({
  selectedService,
  accent,
  form,
  setForm,
  selectedSlot,
  setSelectedSlot,
  slug,
  loading,
  setLoading,
  setCalendarUrl,
  setOtpVerified,
  otpVerified,
  setOtpSentTo,
  otpSentTo,
  otpLoading,
  setOtpLoading,
  otpCooldown,
  setOtpCooldown,
  slots,
  calendarUrl,
  today,
}) => {
  const { CURRENCY } = useAppContext();

  return (
    <section className="bg-white rounded-3xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)] border border-slate-100 p-6 sm:p-8 lg:p-12">
      <h2 className="text-[22px] sm:text-[26px] font-extrabold text-slate-900">
        Choose your appointment
      </h2>

      {selectedService ? (
        <p className="mt-2.5 flex items-center gap-2 text-[14px] font-bold text-slate-500">
          <Clock className="h-4 w-4" style={{ color: accent }} />
          <span style={{ color: accent }}>{selectedService.name}</span>
          <span className="text-slate-300">·</span>
          {selectedService.duration} minutes
          <span className="text-slate-300">·</span>
          {CURRENCY} {Number(selectedService.price).toLocaleString()}
        </p>
      ) : (
        <p className="mt-2.5 text-[14px] font-medium text-slate-500">
          Select a service to begin
        </p>
      )}

      <form
        onSubmit={(event) =>
          submitPublicBooking(
            event,
            form,
            selectedSlot,
            slug,
            setLoading,
            setCalendarUrl,
            setSelectedSlot,
            setOtpVerified,
          )
        }
        className="mt-10 space-y-7"
      >
        {/* -------- Date -------- */}
        <InputField
          label="Date"
          name="date"
          type="date"
          size="m"
          value={form.date}
          onChange={(event) =>
            handlePublicBookingChange(
              event,
              form,
              otpVerified,
              slug,
              setForm,
              setOtpVerified,
              setOtpSentTo,
            )
          }
          min={today}
          iconLeft={<CalendarDays className="h-4.5 w-4.5" />}
        />

        {/* -------- Available times -------- */}
        <div className="pt-2">
          <p className="text-[13px] font-bold text-slate-800">
            Available times
          </p>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {slots.map((slot) => {
              const isSlotSelected = selectedSlot?.startTime === slot.startTime;
              return (
                <button
                  key={`${slot.startTime}-${slot.endTime}`}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`flex items-center justify-center gap-2 rounded-[14px] border py-3.5 text-[14px] font-bold transition-all shadow-sm ${
                    isSlotSelected
                      ? "border-transparent text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                  style={
                    isSlotSelected ? { backgroundColor: accent } : undefined
                  }
                >
                  {slot.startTime}
                  {isSlotSelected && <BadgeCheck className="h-4 w-4" />}
                </button>
              );
            })}
          </div>

          {slots.length === 0 && (
            <p className="mt-3 text-[13px] font-medium text-slate-500 bg-slate-50 rounded-xl p-4 border border-slate-100">
              No times available for this date.
            </p>
          )}
        </div>

        {/* -------- Name & Email -------- */}
        <div className="grid gap-5 sm:grid-cols-2 pt-2">
          <InputField
            label="Your name"
            name="customerName"
            type="text"
            value={form.customerName}
            onChange={(event) =>
              handlePublicBookingChange(
                event,
                form,
                otpVerified,
                slug,
                setForm,
                setOtpVerified,
                setOtpSentTo,
              )
            }
            placeholder="Enter your name"
            iconLeft={<User className="h-4.5 w-4.5" />}
          />

          <InputField
            label="Email address"
            name="customerEmail"
            type="email"
            value={form.customerEmail}
            onChange={(event) =>
              handlePublicBookingChange(
                event,
                form,
                otpVerified,
                slug,
                setForm,
                setOtpVerified,
                setOtpSentTo,
              )
            }
            placeholder="Enter your email"
            iconLeft={<Mail className="h-4.5 w-4.5" />}
          />
        </div>

        {/* -------- OTP -------- */}
        <div className="rounded-[20px] bg-[#f8f9fc] p-6 border border-slate-100">
          <label
            className="text-[13px] font-bold text-slate-800"
            style={{ color: accent }}
          >
            Email verification code
          </label>

          <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
            <InputField
              name="emailOtp"
              type="text"
              size="m"
              value={form.emailOtp}
              onChange={(event) =>
                handlePublicBookingChange(
                  event,
                  form,
                  otpVerified,
                  slug,
                  setForm,
                  setOtpVerified,
                  setOtpSentTo,
                )
              }
              placeholder="Enter 6-digit code"
              inputMode="numeric"
              maxLength={6}
              autoComplete="one-time-code"
            />

            {otpVerified ? (
              <button
                type="button"
                disabled
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-semibold cursor-default"
              >
                <BadgeCheck className="w-4 h-4" />
                Verified
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  sendBookingOtp(
                    form,
                    slug,
                    setOtpLoading,
                    setOtpSentTo,
                    setOtpCooldown,
                  )
                }
                disabled={otpLoading || !form.customerEmail || otpCooldown > 0}
                className="rounded-[14px] border border-slate-200 bg-white px-6 py-3.5 text-[13px] font-extrabold text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition-colors shadow-sm"
              >
                {otpLoading ? (
                  <Oval
                    height={18}
                    width={18}
                    color="#7D57F5"
                    secondaryColor="#7C3AED"
                    visible={true}
                    ariaLabel="loading"
                    strokeWidth={4}
                    strokeWidthSecondary={4}
                  />
                ) : otpCooldown > 0 ? (
                  `Resend code (${otpCooldown}s)`
                ) : otpSentTo === form.customerEmail.trim().toLowerCase() ? (
                  "Resend code"
                ) : (
                  "Send code"
                )}
              </button>
            )}
          </div>
        </div>

        {/* -------- Avatar selector -------- */}
        <div className="pt-2">
          <label className="text-[13px] font-bold text-slate-800">
            Choose your avatar
          </label>
          <div className="mt-3 grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-8 gap-3">
            {Object.keys(AVATAR_MAP)
              .slice(0, 15)
              .map((avatarName) => (
                <button
                  key={avatarName}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      customerAvatar: avatarName,
                    }))
                  }
                  className={`relative flex aspect-square items-center justify-center rounded-full border transition-all overflow-hidden ${
                    form.customerAvatar === avatarName
                      ? "ring-2 ring-offset-2"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                  style={
                    form.customerAvatar === avatarName
                      ? { borderColor: accent, "--tw-ring-color": accent }
                      : undefined
                  }
                >
                  <img
                    src={AVATAR_MAP[avatarName]}
                    alt="Customer Avatar"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
          </div>
        </div>

        {/* -------- Notes -------- */}
        <div className="pt-2">
          <TextAreaField
            label={
              <>
                Notes{" "}
                <span className="font-medium text-slate-400 ml-1">
                  (Optional)
                </span>
              </>
            }
            name="notes"
            rows={3}
            size="m"
            value={form.notes}
            onChange={(value) =>
              handlePublicBookingChange(
                { target: { name: "notes", value } },
                form,
                otpVerified,
                slug,
                setForm,
                setOtpVerified,
                setOtpSentTo,
              )
            }
            placeholder="Add any notes or special requests..."
          />
        </div>

        {/* -------- Submit -------- */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-[15px] font-extrabold text-white shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:hover:scale-100"
            style={{ backgroundColor: accent }}
          >
            <Lock className="h-4.5 w-4.5" />
            {loading ? (
              <Oval
                height={20}
                width={20}
                color="#ffffff"
                visible={true}
                ariaLabel="loading"
                secondaryColor="#d1d5db"
                strokeWidth={4}
                strokeWidthSecondary={4}
              />
            ) : Number(selectedService?.price || 0) > 0 ? (
              `Pay ${CURRENCY} ${Number(selectedService.price).toLocaleString()} and Book Appointment`
            ) : (
              "Confirm booking"
            )}
          </button>

          <p className="mt-4 flex items-center justify-center gap-2 text-[12px] font-bold text-slate-500">
            <Shield className="h-4 w-4 text-slate-400" />
            Secure payments powered by Stripe
          </p>
        </div>

        {calendarUrl && (
          <a
            href={calendarUrl}
            target="_blank"
            rel="noreferrer"
            className="block text-center text-[13px] font-extrabold hover:underline"
            style={{ color: accent }}
          >
            Add to Google Calendar
          </a>
        )}
      </form>
    </section>
  );
};

export default BookingForm;
