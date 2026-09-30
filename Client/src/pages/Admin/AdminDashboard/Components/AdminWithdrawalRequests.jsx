import { CheckCircle, Clock, Landmark } from "lucide-react";
import {
  formatStatusLabel,
  isTerminalWithdrawalStatus,
  withdrawalStatuses,
} from "../../../../utils/adminDashboard";
import { formatMoney } from "../../../../utils/money";

const AdminWithdrawalRequests = ({
  withdrawals,
  CURRENCY,
  getWithdrawalStatusClass,
  updatingWithdrawalId,
  requestWithdrawalStatusChange,
}) => {
  return (
    <div className="min-w-0 rounded-[18px] sm:rounded-3xl border border-gray-100 bg-white p-4 sm:p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.04)] flex flex-col">
      <h2 className="text-[16px] sm:text-[18px] font-extrabold text-gray-900 flex items-center gap-2 mb-5 sm:mb-6">
        <Clock className="w-5 h-5 text-[#2DD4BF]" /> Withdrawal Requests
      </h2>

      <div className="flex-1 space-y-4 overflow-y-auto pr-0 sm:pr-2 custom-scrollbar max-h-none xl:max-h-125">
        {withdrawals.map((withdrawal) => {
          const isWithdrawalLocked = isTerminalWithdrawalStatus(
            withdrawal.status,
          );

          return (
            <div
              key={withdrawal._id}
              className="rounded-2xl bg-[#FAFAFA] border border-gray-100 p-4 sm:p-5 group hover:border-[#E8F3FF]/30 transition-colors"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div>
                  <p className="font-bold text-gray-900 text-[14.5px]">
                    {withdrawal.userId?.businessName || withdrawal.userId?.name}
                  </p>

                  <p className="text-[12px] font-medium text-gray-500">
                    {withdrawal.userId?.email}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[16px] font-extrabold text-gray-900">
                    {formatMoney(withdrawal.amount, CURRENCY)}
                  </span>

                  <div className="mt-1">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${getWithdrawalStatusClass(withdrawal.status)}`}
                    >
                      {withdrawal.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 bg-white border border-gray-100 p-2.5 rounded-xl text-[12px] font-medium text-gray-600 flex items-start sm:items-center gap-2 wrap-break-words">
                <Landmark className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                {withdrawal.payoutSnapshot?.bankName || "UPI Connection"} •{" "}
                {withdrawal.payoutSnapshot?.accountLast
                  ? `**** ${withdrawal.payoutSnapshot.accountLast}`
                  : withdrawal.payoutSnapshot?.upiId}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {withdrawalStatuses.map((status) => {
                  const isCurrentStatus = withdrawal.status === status;

                  const isUpdatingThisWithdrawal =
                    updatingWithdrawalId === withdrawal._id;

                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() =>
                        requestWithdrawalStatusChange(withdrawal, status)
                      }
                      disabled={
                        isUpdatingThisWithdrawal ||
                        isCurrentStatus ||
                        isWithdrawalLocked
                      }
                      className={`min-w-23 flex-1 rounded-[10px] py-2 text-[12px] font-bold capitalize transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                        isCurrentStatus
                          ? "bg-gray-200 text-gray-800"
                          : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {isUpdatingThisWithdrawal && !isCurrentStatus
                        ? "..."
                        : formatStatusLabel(status)}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {withdrawals.length === 0 && (
          <div className="py-10 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
              <CheckCircle className="w-6 h-6 text-gray-300" />
            </div>

            <p className="text-[14px] font-medium text-gray-400">
              No pending withdrawal requests.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminWithdrawalRequests;
