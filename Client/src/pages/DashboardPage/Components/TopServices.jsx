// Client / src / pages / DashboardPage / Components / TopServices.jsx
import { Link } from "react-router-dom";
import { ICON_MAP } from "../../../utils/iconMap";

const TopServices = ({ topServices, bookings }) => {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.04)] flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[16px] font-bold text-slate-900">Top Services</h3>

        <Link
          to="/services"
          className="px-4 py-1.5 bg-white text-slate-600 hover:text-slate-900 text-[12px] font-bold rounded-full border border-slate-200 shadow-sm"
        >
          View all
        </Link>
      </div>

      <div className="space-y-6 flex-1 mt-2">
        {topServices.map((service, index) => {
          const max = Math.max(1, ...topServices.map((i) => i.bookingCount));

          const pct = ((service.bookingCount / max) * 100).toFixed(0);

          const truePct = (
            (service.bookingCount / Math.max(1, bookings.length)) *
            100
          ).toFixed(0);

          const barColors = [
            "bg-[#7c3aed]",
            "bg-[#2563eb]",
            "bg-[#16a34a]",
            "bg-[#ea580c]",
          ];

          const barColor = barColors[index % barColors.length];

          return (
            <div key={service._id} className="flex items-center mb-6 last:mb-0">
              <div className="w-11.5 h-11.5 rounded-[14px] flex items-center justify-center shrink-0 border border-slate-200 bg-white overflow-hidden mr-4">
                <img
                  src={ICON_MAP[service.icon || "C1.png"]}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 pr-6">
                <p className="text-[14px] font-semibold text-slate-800 leading-tight">
                  {service.name}
                </p>

                <p className="text-[12px] font-medium text-slate-500 mt-1 mb-2.5">
                  {service.bookingCount} bookings
                </p>

                <div className="w-full h-1 bg-slate-50 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${barColor}`}
                    style={{
                      width: `${pct}%`,
                      transition: "width 1s ease-out",
                    }}
                  ></div>
                </div>
              </div>

              <span className="text-[13px] font-semibold text-slate-600 text-right min-w-9">
                {truePct}%
              </span>
            </div>
          );
        })}

        {topServices.length === 0 && (
          <p className="text-[13px] font-medium text-slate-500 text-center pt-10">
            Add services to start tracking demand.
          </p>
        )}
      </div>
    </div>
  );
};

export default TopServices;
