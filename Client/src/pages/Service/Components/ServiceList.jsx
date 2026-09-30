import { Layers } from "lucide-react";
import ServiceItem from "./ServiceItem";

const ServiceList = ({
  services,
  handleToggleService,
  startEditing,
  confirmDelete,
}) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
        <Layers className="h-5 w-5 text-[#2DD4BF]" />
        Your services
      </h2>

      <div className="mt-5 space-y-3">
        {services.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-gray-50 py-10">
            <Layers className="h-10 w-10 text-gray-300" />

            <p className="mt-3 text-sm text-gray-500">No services yet.</p>
          </div>
        )}

        {services.map((service) => (
          <ServiceItem
            key={service._id}
            service={service}
            handleToggleService={handleToggleService}
            startEditing={startEditing}
            confirmDelete={confirmDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default ServiceList;
