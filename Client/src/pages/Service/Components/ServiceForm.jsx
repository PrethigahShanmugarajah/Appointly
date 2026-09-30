import { Clock, FileText, Layers, Plus, Save, X } from "lucide-react";
import { P5 } from "../../../assets/assets";
import { useAppContext } from "../../../context/appContext";
import { InputField } from "../../../components/FormField/InputField";
import { SelectInput } from "../../../components/FormField/SelectInput";
import { TextAreaField } from "../../../components/FormField/TextAreaField";
import { ICON_MAP } from "../../../utils/iconMap";
import { Oval } from "react-loader-spinner";

const ServiceForm = ({
  form,
  editingId,
  loading,
  handleChange,
  handleSubmit,
  setForm,
  cancelEditing,
}) => {
  const { CURRENCY } = useAppContext();

  return (
    <section>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2DD4BF]">
            Services
          </p>

          <h1 className="mt-2 text-[28px] md:text-[36px] font-extrabold leading-[1.1] tracking-tight text-[#164E63]">
            Shape what customers can{" "}
            <span className="bg-linear-to-b from-[#F0ABFC] via-[#E879F9] to-[#DC2626] bg-clip-text text-transparent custom-brand-font text-[32px] md:text-[42px] relative top-0 md:top-1 ml-1 md:ml-2">
              book.
            </span>
          </h1>

          <p className="mt-2 max-w-md text-[13px] md:text-sm text-gray-500">
            Add each appointment type with a duration and price. Active services
            appear on your public booking page.
          </p>
        </div>

        <div className="hidden lg:block h-48 w-48 shrink-0">
          <img
            src={P5}
            alt="Illustration"
            className="w-full h-full object-contain drop-shadow-sm"
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
          <Plus className="h-5 w-5 text-[#2DD4BF]" />
          {editingId ? "Edit service" : "Add new service"}
        </h3>

        <div className="mt-5 grid gap-4">
          <InputField
            label="Service name"
            name="name"
            type="text"
            placeholder="Consultation"
            size="s"
            value={form.name}
            onChange={handleChange}
            iconLeft={<Layers className="h-4 w-4" />}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <SelectInput
              label="Duration"
              options={[15, 30, 45, 60, 90, 120].map((value) => ({
                value,
                label: `${value} minutes`,
              }))}
              value={form.duration}
              onChange={(value) =>
                handleChange({
                  target: {
                    name: "duration",
                    value,
                  },
                })
              }
              size="lg"
              isClearable={false}
              iconLeft={<Clock className="h-4 w-4" />}
            />

            <InputField
              label="Price"
              name="price"
              type="number"
              min="0"
              size="s"
              value={form.price}
              onChange={handleChange}
              iconLeft={<span className="text-sm">{CURRENCY}</span>}
            />
          </div>

          <TextAreaField
            label="Description"
            name="description"
            rows={3}
            value={form.description}
            onChange={(value) =>
              handleChange({
                target: {
                  name: "description",
                  value,
                },
              })
            }
            placeholder="A short customer-facing description"
            iconLeft={<FileText className="h-4 w-4" />}
          />

          <label className="text-sm font-medium text-gray-700">
            Service Icon
            <div className="mt-3 grid grid-cols-4 gap-2 md:gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {Object.keys(ICON_MAP).map((iconName) => (
                <button
                  key={iconName}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, icon: iconName }))
                  }
                  className={
                    form.icon === iconName
                      ? "relative flex aspect-square items-center justify-center rounded-xl border transition-all overflow-hidden border-[#2DD4BF] bg-[#F0FDFA] ring-2 ring-[#2DD4BF]/20"
                      : "relative flex aspect-square items-center justify-center rounded-xl border transition-all overflow-hidden border-gray-200 bg-white hover:border-[#2DD4BF]/50 hover:bg-gray-50"
                  }
                >
                  <img
                    src={ICON_MAP[iconName]}
                    alt="Service Icon"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </label>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-linear-to-b from-[#99F6E4] via-[#5EEAD4] to-[#2DD4BF] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? (
              <Oval
                height="18"
                width="18"
                color="#FFFFFF"
                visible={true}
                ariaLabel="loading"
                secondaryColor="#FFFFFF"
                strokeWidth={4}
                strokeWidthSecondary={4}
              />
            ) : editingId ? (
              <>
                <Save className="h-4 w-4" /> Save changes
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Add service
              </>
            )}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={cancelEditing}
              className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default ServiceForm;
