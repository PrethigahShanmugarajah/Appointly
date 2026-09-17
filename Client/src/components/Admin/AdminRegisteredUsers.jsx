// Client / src / components / Admin / AdminRegisteredUsers.jsx
import { UserCheck } from "lucide-react";

const AdminRegisteredUsers = ({ users, getPayoutStatusClass }) => {
  return (
    <div className="min-w-0 rounded-[18px] sm:rounded-3xl border border-slate-100 bg-white p-4 sm:p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5 sm:mb-6">
        <h2 className="text-[16px] sm:text-[18px] font-extrabold text-slate-900 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-[#7D57F5]" /> Registered Users
        </h2>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full min-w-160 md:min-w-175 text-left">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="py-3 px-4 text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                Business
              </th>

              <th className="py-3 px-4 text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                Email
              </th>

              <th className="py-3 px-4 text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                Booking Link
              </th>

              <th className="py-3 px-4 text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {users?.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="font-bold text-slate-900 text-[14px]">
                    {user.businessName || user.name}
                  </div>
                </td>

                <td className="py-4 px-4 text-[13px] font-medium text-slate-500">
                  {user.email}
                </td>

                <td className="py-4 px-4 text-[13px] font-medium text-slate-500">
                  /book/{user.slug}
                </td>

                <td className="py-4 px-4">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-md text-[11px] font-bold ${getPayoutStatusClass(user.payoutDetails?.isComplete)}`}
                  >
                    {user?.payoutDetails?.isComplete
                      ? "Ready"
                      : "Pending Details"}
                  </span>
                </td>
              </tr>
            ))}

            {users?.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="py-8 text-center text-[13px] font-medium text-slate-400"
                >
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRegisteredUsers;
