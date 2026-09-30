import { useAppContext } from "../../../../context/appContext";
import { useEffect, useState } from "react";
import {
  changeAdminWithdrawalStatus,
  fetchAdminDashboard,
} from "../Services/AdminDashboardServices";
import {
  formatStatusLabel,
  isTerminalWithdrawalStatus,
} from "../../../../utils/adminDashboard";
import {
  CheckCircle,
  CircleDollarSign,
  Landmark,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { formatMoney } from "../../../../utils/money";
import AdminDashboardHeader from "../Components/AdminDashboardHeader";
import AdminDashboardStats from "../Components/AdminDashboardStats";
import AdminRegisteredUsers from "../Components/AdminRegisteredUsers";
import AdminWithdrawalRequests from "../Components/AdminWithdrawalRequests";
import AdminRecentBookings from "../Components/AdminRecentBookings";
import ConfirmPopup from "../../../../components/ConfirmPopup";

const AdminDashboard = () => {
  const { navigate, CURRENCY } = useAppContext();

  const [dashboard, setDashboard] = useState(null);
  const [updatingWithdrawalId, setUpdatingWithdrawalId] = useState("");
  const [pendingWithdrawalAction, setPendingWithdrawalAction] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin/login");
      return undefined;
    }

    let isActive = true;

    fetchAdminDashboard()
      .then((data) => {
        if (isActive) {
          setDashboard(data);
        }
      })
      .catch(() => {});

    return () => {
      isActive = false;
    };
  }, [navigate]);

  const requestWithdrawalStatusChange = (withdrawal, status) => {
    if (
      withdrawal.status === status ||
      isTerminalWithdrawalStatus(withdrawal.status)
    ) {
      return;
    }

    setPendingWithdrawalAction({ withdrawal, status });
  };

  const closeWithdrawalConfirm = () => {
    if (updatingWithdrawalId) return;
    setPendingWithdrawalAction(null);
  };

  const changeWithdrawalStatus = async () => {
    if (!pendingWithdrawalAction) return;

    const { withdrawal, status } = pendingWithdrawalAction;
    setUpdatingWithdrawalId(withdrawal._id);

    try {
      const data = await changeAdminWithdrawalStatus(withdrawal._id, status);
      setDashboard((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          summary: data.summary || prev.summary,
          withdrawals: prev.withdrawals.map((withdrawal) =>
            withdrawal._id === data.withdrawal._id
              ? data.withdrawal
              : withdrawal,
          ),
        };
      });
    } finally {
      setUpdatingWithdrawalId("");
      setPendingWithdrawalAction(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const summary = dashboard?.summary || {};

  const pendingWithdrawal = pendingWithdrawalAction?.withdrawal;

  const isConfirmingWithdrawal =
    pendingWithdrawal && updatingWithdrawalId === pendingWithdrawal._id;

  /* -------- Helpers for dynamic classes from styles -------- */
  const getPayoutStatusClass = (isComplete) =>
    isComplete ? "bg-[#DDF8EE] text-[#059669]" : "bg-[#FEF2F2] text-[#DC2626]";

  const getWithdrawalStatusClass = (status) =>
    status === "processing"
      ? "bg-[#FEF3C7] text-[#D97706]"
      : status === "paid"
        ? "bg-[#DDF8EE] text-[#059669]"
        : status === "rejected"
          ? "bg-[#FEF2F2] text-[#DC2626]"
          : "bg-gray-100 text-gray-600";

  const statCards = [
    {
      label: "Total Users",
      value: summary.users || 0,
      icon: Users,
      bg: "bg-[#F0FDFA]",
      c: "text-[#2DD4BF]",
    },
    {
      label: "Paid Bookings",
      value: summary.paidBookings || 0,
      icon: CheckCircle,
      bg: "bg-[#DDF8EE]",
      c: "text-[#059669]",
    },
    {
      label: "Gross Revenue",
      value: formatMoney(summary.grossRevenue, CURRENCY),
      icon: TrendingUp,
      bg: "bg-[#CFFAFE]",
      c: "text-[#14B8A6]",
    },
    {
      label: "Platform Fees",
      value: formatMoney(summary.platformFees, CURRENCY),
      icon: CircleDollarSign,
      bg: "bg-[#EEF2FF]",
      c: "text-[#4F46E5]",
    },
    {
      label: "Provider Payouts",
      value: formatMoney(summary.providerPayouts, CURRENCY),
      icon: Wallet,
      bg: "bg-[#DCFCE7]",
      c: "text-[#16A34A]",
    },
    {
      label: "Withdrawal Hold",
      value: formatMoney(summary.withdrawalHolds, CURRENCY),
      icon: Landmark,
      bg: "bg-[#FEF3C7]",
      c: "text-[#D97706]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-800 tracking-tight font-sans">
      <AdminDashboardHeader logout={logout} />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 space-y-6 sm:px-5 sm:py-8 lg:py-10 lg:space-y-8">
        <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-[28px] sm:text-[32px] md:text-[38px] font-extrabold text-gray-900 tracking-tight leading-[1.05]">
              Platform
              <span className="bg-linear-to-b from-[#F0ABFC] via-[#E879F9] to-[#DC2626] bg-clip-text text-transparent custom-brand-font text-[34px] sm:text-[36px] md:text-[44px] relative top-1 ml-1 md:ml-2">
                Overview
              </span>
            </h1>

            <p className="mt-1.5 text-[15px] font-medium text-gray-500">
              Users, bookings, revenue, and active withdrawals.
            </p>
          </div>
        </section>

        <AdminDashboardStats statCards={statCards} />

        <section className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-5 lg:gap-6 mt-6 lg:mt-8">
          <AdminRegisteredUsers
            users={dashboard?.users || []}
            getPayoutStatusClass={getPayoutStatusClass}
          />

          <AdminWithdrawalRequests
            withdrawals={dashboard?.withdrawals || []}
            CURRENCY={CURRENCY}
            getWithdrawalStatusClass={getWithdrawalStatusClass}
            updatingWithdrawalId={updatingWithdrawalId}
            requestWithdrawalStatusChange={requestWithdrawalStatusChange}
          />
        </section>

        {/* -------- Recent bookings table -------- */}
        <AdminRecentBookings
          recentBookings={dashboard?.recentBookings || []}
          CURRENCY={CURRENCY}
        />
      </main>

      {pendingWithdrawalAction && (
        <ConfirmPopup
          onClose={closeWithdrawalConfirm}
          onConfirm={changeWithdrawalStatus}
          loading={isConfirmingWithdrawal}
          title="Confirm withdrawal status"
          description={
            <>
              Are you sure you want to mark this withdrawal as{" "}
              <strong
                className={
                  pendingWithdrawalAction.status === "processing"
                    ? "text-[#D97706]"
                    : pendingWithdrawalAction.status === "paid"
                      ? "text-[#059669]"
                      : pendingWithdrawalAction.status === "rejected"
                        ? "text-[#DC2626]"
                        : "text-black"
                }
              >
                {formatStatusLabel(pendingWithdrawalAction.status)}
              </strong>
              ?
              <br />
              This action cannot be undone.
            </>
          }
          confirmText={`Confirm ${formatStatusLabel(
            pendingWithdrawalAction.status,
          )}`}
          closeText="Cancel"
          confirmColor={
            pendingWithdrawalAction.status === "processing"
              ? "amber"
              : pendingWithdrawalAction.status === "paid"
                ? "emerald"
                : pendingWithdrawalAction.status === "rejected"
                  ? "red"
                  : "black"
          }
          item={
            pendingWithdrawal?.userId?.businessName ||
            pendingWithdrawal?.userId?.name ||
            "Provider"
          }
        />
      )}
    </div>
  );
};

export default AdminDashboard;
