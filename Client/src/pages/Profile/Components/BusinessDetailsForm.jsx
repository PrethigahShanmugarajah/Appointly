import { Globe, Save, Users } from "lucide-react";
import { useAppContext } from "../../../context/appContext";
import { brandThemeOptions } from "../../../utils/theme";
import { Oval } from "react-loader-spinner";
import { InputField } from "../../../components/FormField/InputField";
import { SelectInput } from "../../../components/FormField/SelectInput";
import { TextAreaField } from "../../../components/FormField/TextAreaField";

const BusinessDetailsForm = ({
  form,
  handleChange,
  handleSubmit,
  chooseTheme,
  loading,
}) => {
  const { TIME_ZONES } = useAppContext();

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-[#E0F7FA] flex items-center justify-center shadow-inner">
          <Users className="w-6 h-6 text-[#0D9488]" />
        </div>

        <div>
          <h2 className="text-[18px] font-extrabold text-gray-900">
            Business details
          </h2>

          <p className="text-[13px] text-gray-500 font-medium">
            Update your profile info
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <InputField
          label="Business Name"
          name="businessName"
          type="text"
          value={form.businessName}
          onChange={handleChange}
          iconRight={<Globe className="w-4 h-4" />}
        />

        <TextAreaField
          label="Business Description"
          name="businessDescription"
          value={form.businessDescription}
          onChange={(value) =>
            handleChange({
              target: {
                name: "businessDescription",
                value,
              },
            })
          }
          rows={3}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <SelectInput
            label="Timezone"
            options={TIME_ZONES.map((timezone) => ({
              value: timezone,
              label: timezone,
            }))}
            value={form.timezone}
            onChange={(value) =>
              handleChange({
                target: {
                  name: "timezone",
                  value,
                },
              })
            }
            size="lg"
            isClearable={false}
          />

          <div>
            <label className="block text-[13px] font-bold text-gray-700 mb-2">
              Accent color
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-3.5 py-2.5 bg-[#FAFAFA] outline-none focus-within:border-[#0D9488] focus-within:ring-1 focus-within:ring-[#0D9488] focus-within:bg-white transition-all hover:border-gray-300">
              <InputField
                name="brandAccent"
                type="color"
                size="m"
                value={form.brandAccent}
                onChange={handleChange}
                inputClassName="!w-8 !h-8 !p-0 !px-0 !py-0 !rounded-md !border-0 !bg-transparent !shadow-none cursor-pointer shrink-0"
              />

              <InputField
                name="brandAccent"
                type="text"
                size="xs"
                value={form.brandAccent.toUpperCase()}
                onChange={handleChange}
                inputClassName="text-[14px] font-semibold text-gray-800 uppercase bg-transparent"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-bold text-gray-700 mb-2">
            Theme
          </label>

          <div className="flex flex-wrap gap-2.5">
            {brandThemeOptions.map((theme) => {
              const isSelected = form.brandTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => chooseTheme(theme)}
                  className={
                    isSelected
                      ? "flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold rounded-xl border transition-all bg-[#09090B] text-white border-[#09090B] shadow-md"
                      : "flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold rounded-xl border transition-all bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }
                >
                  <span
                    className={`w-3 h-3 rounded-full shadow-inner ${theme.swatch}`}
                  />
                  {theme.label}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 flex items-center justify-center gap-2 w-full py-4 rounded-[14px] bg-[#09090B] hover:bg-gray-800 text-white text-[15px] font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-60"
        >
          {loading ? (
            <Oval
              height="20"
              width="20"
              color="currentColor"
              visible={true}
              ariaLabel="oval-loading"
            />
          ) : (
            <>
              <Save className="w-5 h-5" /> Save profile settings
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default BusinessDetailsForm;
