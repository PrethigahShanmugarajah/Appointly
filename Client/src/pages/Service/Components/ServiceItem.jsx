import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { ICON_MAP } from "../../../utils/iconMap";
import { useAppContext } from "../../../context/appContext";

const ServiceItem = ({
  service,
  handleToggleService,
  startEditing,
  confirmDelete,
}) => {
  const { CURRENCY } = useAppContext();

  return (
    <article className="rounded-2xl border border-gray-200 p-4 transition hover:shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-3 w-full">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white overflow-hidden">
            <img
              src={ICON_MAP[service.icon || "C1.png"]}
              alt={service.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0 pr-2">
            <h3 className="font-semibold text-gray-900 truncate">
              {service.name}
            </h3>

            <p className="mt-0.5 text-sm text-gray-500">
              {service.duration} min · {CURRENCY}{" "}
              {Number(service.price).toLocaleString()}
            </p>

            {service.description && (
              <p className="mt-1.5 text-sm text-gray-500">
                {service.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 self-end sm:self-auto ml-14 sm:ml-0">
          <button
            type="button"
            onClick={() => handleToggleService(service)}
            className={
              service.isActive
                ? "flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold bg-green-50 text-green-700"
                : "flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold bg-gray-100 text-gray-500"
            }
          >
            {service.isActive ? (
              <Eye className="h-3 w-3" />
            ) : (
              <EyeOff className="h-3 w-3" />
            )}
            {service.isActive ? "Active" : "Hidden"}
          </button>

          <button
            type="button"
            onClick={() => startEditing(service)}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => confirmDelete(service)}
            className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ServiceItem;
