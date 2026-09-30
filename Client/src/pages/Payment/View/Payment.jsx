import { useEffect, useState } from "react";
import { loadPaymentOverview } from "../Services/PaymentServices";
import AppLayout from "../../../components/AppLayout";
import PaymentHeader from "../Components/PaymentHeader";
import WalletCards from "../Components/WalletCards";
import WithdrawSection from "../Components/WithdrawSection";
import PayoutDetailsForm from "../Components/PayoutDetailsForm";
import RecentActivity from "../Components/RecentActivity";

const Payment = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [form, setForm] = useState({
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
    upiId: "",
  });

  const wallet = overview?.wallet || {};
  const payoutDetails = overview?.payoutDetails || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      loadPaymentOverview(setOverview, setForm);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AppLayout>
      <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        {/* -------- Left -------- */}
        <div className="space-y-6">
          <PaymentHeader />

          <WalletCards wallet={wallet} />

          <WithdrawSection
            wallet={wallet}
            payoutDetails={payoutDetails}
            withdrawalAmount={withdrawalAmount}
            setWithdrawalAmount={setWithdrawalAmount}
            setLoading={setLoading}
            loading={loading}
            loadOverview={() => loadPaymentOverview(setOverview, setForm)}
          />
        </div>

        {/* -------- Right -------- */}
        <div className="space-y-6">
          <PayoutDetailsForm
            form={form}
            payoutDetails={payoutDetails}
            setOverview={setOverview}
            setForm={setForm}
            setLoading={setLoading}
            loading={loading}
          />

          <RecentActivity transactions={overview?.transactions || []} />
        </div>
      </section>
    </AppLayout>
  );
};

export default Payment;
