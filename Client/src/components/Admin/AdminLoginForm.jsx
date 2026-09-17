// Client / src / components / Admin / AdminLoginForm.jsx
import { Eye, EyeOff } from "lucide-react";
import { InputField } from "../FormField/InputField";
import { Oval } from "react-loader-spinner";

const AdminLoginForm = ({
  form,
  setForm,
  loading,
  showPassword,
  setShowPassword,
  handleSubmit,
}) => {
  return (
    <div className="lg:w-7/12 p-6 sm:p-8 md:p-10 lg:p-14">
      <h2 className="text-[22px] sm:text-[24px] font-extrabold text-slate-900">
        Admin Login
      </h2>

      <p className="text-[14px] text-slate-500 font-medium mt-1.5">
        Enter your credential to access the dashboard.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="space-y-5">
          {/* <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))
              }
              className="w-full rounded-[14px] border border-slate-200 px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#7D57F5] focus:border-transparent transition-shadow text-[14px] font-medium"
              required
              placeholder="admin@example.com"
            />
          </div> */}

          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="admin@example.com"
            size="m"
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                email: event.target.value,
              }))
            }
            required
          />

          {/* <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              className="w-full rounded-[14px] border border-slate-200 px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#7D57F5] focus:border-transparent transition-shadow text-[14px] font-medium"
              placeholder="********"
              required
            />
          </div> */}

          <InputField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            size="m"
            value={form.password}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                password: event.target.value,
              }))
            }
            required
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
            className="w-full flex items-center justify-center bg-linear-to-b from-[#CBB8FF] via-[#9B7BFF] to-[#7D57F5] px-5 py-3.5 text-[15px] font-bold text-white shadow-sm hover:shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <Oval
                height={20}
                width={20}
                color="#FFFFFF"
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#FFFFFF"
                strokeWidth={4}
                strokeWidthSecondary={4}
              />
            ) : (
              "Secure Login"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginForm;
