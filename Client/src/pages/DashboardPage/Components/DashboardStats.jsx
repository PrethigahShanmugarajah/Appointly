// Client / src / pages / DashboardPage / Components / DashboardStats.jsx
import { Calendar, CheckCircle, RefreshCcw, Wallet } from "lucide-react";
import { formatMoney } from "../../../utils/money";
import { useAppContext } from "../../../context/appContext";

const DashboardStats = ({
  bookings,
  confirmedBookings,
  rescheduledBookings,
  paidBookings,
}) => {
  const { CURRENCY } = useAppContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          label: "Total Bookings",
          value: bookings.length,
          icon: Calendar,
          icfg: "text-[#7D57F5]",
          ibg: "bg-[#F4F0FF]",
        },
        {
          label: "Confirmed",
          value: confirmedBookings.length,
          icon: CheckCircle,
          icfg: "text-[#16a34a]",
          ibg: "bg-[#eafbef]",
        },
        {
          label: "Rescheduled",
          value: rescheduledBookings.length,
          icon: RefreshCcw,
          icfg: "text-[#ea580c]",
          ibg: "bg-[#ffedd5]",
        },
        {
          label: "Total Income",
          value: formatMoney(
            paidBookings.reduce((s, b) => s + (b.providerPayoutAmount || 0), 0),
            CURRENCY,
          ),
          icon: Wallet,
          icfg: "text-[#16a34a]",
          ibg: "bg-[#eafbef]",
        },
      ].map((stat, i) => (
        <div
          key={i}
          className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.04)] flex flex-col items-start gap-4"
        >
          <div className={`p-4 rounded-2xl ${stat.ibg} ${stat.icfg}`}>
            <stat.icon className="w-5.5 h-5.5" />
          </div>

          <div>
            <p className="text-[13px] font-bold text-slate-500 mb-1">
              {stat.label}
            </p>

            <h2 className="text-[28px] font-extrabold text-slate-900 tracking-tight">
              {stat.value}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
