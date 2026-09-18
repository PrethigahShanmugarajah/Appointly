// Client / src / pages / AuthPage / Components / AuthForm.jsx
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { InputField } from "../../../components/FormField/InputField";
import { Oval } from "react-loader-spinner";

const AuthForm = ({
  isRegister,
  form,
  handleChange,
  handleSubmit,
  loading,
  otpLoading,
  otpSentTo,
  otpVerified,
  otpCooldown,
  sendOtp,
  showPassword,
  setShowPassword,
  handleModeChange,
}) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">
        {isRegister ? "Create account" : "Welcome back"}
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        {isRegister
          ? "Set up your business in minutes"
          : "Log in to manage your bookings"}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {isRegister && (
          <>
            <InputField
              label="Name"
              name="name"
              type="text"
              placeholder="Your full name"
              size="s"
              value={form.name}
              onChange={handleChange}
              iconLeft={<User className="h-4 w-4" />}
            />

            <InputField
              label="Business Name"
              name="businessName"
              type="text"
              placeholder="Your business name"
              size="s"
              value={form.businessName}
              onChange={handleChange}
              iconLeft={<Building2 className="h-4 w-4" />}
            />
          </>
        )}

        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="example@example.com"
          size="s"
          value={form.email}
          onChange={handleChange}
          iconLeft={<Mail className="h-4 w-4" />}
        />

        {isRegister && (
          <div className="rounded-2xl border border-[#EBE4FF] bg-[#F4F0FF]/50 p-4">
            <label className="text-sm font-semibold text-[#7D57F5]">
              Email verification code
            </label>

            <div className="mt-2 grid gap-3 sm:grid-cols-[1fr_auto]">
              <InputField
                name="emailOtp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={form.emailOtp}
                onChange={handleChange}
                placeholder="Enter 6-digit code"
                size="s"
                autoComplete="one-time-code"
                pattern="[0-9]*"
                unstyled={false}
              />

              {otpVerified ? (
                <button
                  type="button"
                  disabled
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white"
                >
                  <BadgeCheck className="h-4 w-4" />
                  Verified
                </button>
              ) : (
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={otpLoading || !form.email || otpCooldown > 0}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                >
                  {otpLoading ? (
                    <Oval
                      height={18}
                      width={18}
                      color="#7D57F5"
                      visible={true}
                      ariaLabel="loading"
                      secondaryColor="#CBB8FF"
                      strokeWidth={4}
                      strokeWidthSecondary={4}
                    />
                  ) : otpCooldown > 0 ? (
                    `Resend code (${otpCooldown}s)`
                  ) : otpSentTo === form.email.trim().toLowerCase() ? (
                    "Resend code"
                  ) : (
                    "Send code"
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        <InputField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="******"
          size="s"
          value={form.password}
          onChange={handleChange}
          iconLeft={<Lock className="h-4 w-4" />}
          iconRight={
            showPassword ? (
              <EyeOff
                size={18}
                className="cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <Eye
                size={18}
                className="cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(true)}
              />
            )
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-b from-[#CBB8FF] via-[#9B7BFF] to-[#7D57F5] py-3.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {loading ? (
            <Oval
              height={18}
              width={18}
              color="#FFFFFF"
              visible={true}
              ariaLabel="loading"
              secondaryColor="#CBB8FF"
              strokeWidth={4}
              strokeWidthSecondary={4}
            />
          ) : isRegister ? (
            <>
              Create account
              <ArrowRight className="h-4 w-4" />
            </>
          ) : (
            <>
              Log in
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <button
        type="button"
        onClick={handleModeChange}
        className="mt-5 text-sm font-medium text-slate-500 hover:text-[#7D57F5]"
      >
        {isRegister
          ? "Already have an account? Log in"
          : "Need an account? Register"}
      </button>
    </section>
  );
};

export default AuthForm;
