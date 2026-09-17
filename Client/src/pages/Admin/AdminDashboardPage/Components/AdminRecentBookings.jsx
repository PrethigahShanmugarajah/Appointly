// Client / src / pages / Admin / AdminDashboardPage / Components  / AdminRecentBookings.jsx
import { CheckCircle } from "lucide-react";
import { formatMoney } from "../../utils/money";

const AdminRecentBookings = ({ recentBookings, CURRENCY }) => {
  return (
    <section className="mt-6 lg:mt-8 min-w-0 rounded-[18px] sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.04)]">
      <h2 className="text-[16px] sm:text-[18px] font-extrabold text-slate-900 flex items-center gap-2 mb-5 sm:mb-6">
        <CheckCircle className="w-5 h-5 text-[#7D57F5]" /> Recent Paid Bookings
      </h2>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full min-w-160 md:min-w-175 text-left">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="py-3 px-4 text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                Provider
              </th>

              <th className="py-3 px-4 text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                Service
              </th>

              <th className="py-3 px-4 text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                Gross
              </th>

              <th className="py-3 px-4 text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                Fees
              </th>

              <th className="py-3 px-4 text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                Provider Share
              </th>

              <th className="py-3 px-4 text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {recentBookings.map((booking) => (
              <tr
                key={booking._id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="py-4 px-4 font-bold text-slate-900 text-[13px]">
                  {booking.userId?.businessName || booking.userId?.name}
                </td>

                <td className="py-4 px-4 text-[13px] font-medium text-slate-500">
                  {booking.serviceId?.name || "Service"}
                </td>

                <td className="py-4 px-4 font-bold text-slate-900 text-[13px]">
                  {formatMoney(booking.amount, CURRENCY)}
                </td>

                <td className="py-4 px-4 text-[13px] font-bold text-[#7D57F5]">
                  {formatMoney(booking.platformFeeAmount, CURRENCY)}
                </td>

                <td className="py-4 px-4 text-[13px] font-bold text-[#16a34a]">
                  {formatMoney(booking.providerPayoutAmount, CURRENCY)}
                </td>

                <td className="py-4 px-4">
                  <span className="inline-flex px-2 py-1 rounded-md text-[10px] font-bold bg-[#eafbef] text-[#16a34a] uppercase tracking-wider">
                    {booking.payoutStatus}
                  </span>
                </td>
              </tr>
            ))}

            {recentBookings.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="py-8 text-center text-[13px] font-medium text-slate-400"
                >
                  No recent transactions.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminRecentBookings;
