// Client / src / pages / PublicBooking / Components / ServiceCard.jsx
import { Check } from "lucide-react";
import { ICON_MAP } from "../../../utils/iconMap";
import { useAppContext } from "../../../context/appContext";

const ServiceCard = ({ service, isActive, setForm, accent }) => {
  const { CURRENCY } = useAppContext();

  return (
    <button
      key={service._id}
      type="button"
      onClick={() => setForm((prev) => ({ ...prev, serviceId: service._id }))}
      className={
        isActive
          ? "flex w-full items-center gap-4 rounded-[20px] p-5 text-left transition-all duration-300 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-transparent translate-x-2"
          : "flex w-full items-center gap-4 rounded-[20px] p-5 text-left transition-all duration-300 bg-white/5 hover:bg-white/10 border border-white/5 backdrop-blur-md"
      }
    >
      <div
        className="h-12 w-12 shrink-0 flex items-center justify-center rounded-xl bg-white transition-all shadow-sm overflow-hidden"
        style={{ boxShadow: isActive ? `0 0 0 2px ${accent}` : "none" }}
      >
        <img
          src={ICON_MAP[service.icon || "C1.png"]}
          alt={service.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 pr-2">
        <span
          className={
            isActive
              ? "block text-[16px] font-extrabold text-slate-900"
              : "block text-[16px] font-extrabold text-white"
          }
        >
          {service.name}
        </span>

        <p
          className={
            isActive
              ? "mt-1 text-[13px] font-semibold text-slate-500"
              : "mt-1 text-[13px] font-semibold text-white/60"
          }
        >
          {service.duration} min · {CURRENCY}{" "}
          {Number(service.price).toLocaleString()}
        </p>

        {service.description && (
          <p
            className={
              isActive
                ? "mt-1.5 text-[12px] leading-relaxed line-clamp-2 text-slate-500"
                : "mt-1.5 text-[12px] leading-relaxed line-clamp-2 text-white/50 font-medium"
            }
          >
            {service.description}
          </p>
        )}
      </div>

      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-opacity ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundColor: accent }}
      >
        <Check className="w-3.5 h-3.5 text-white" />
      </div>
    </button>
  );
};

export default ServiceCard;
