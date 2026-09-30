import { Building2, Save } from "lucide-react";
import {
  handlePaymentChange,
  savePayoutDetails,
} from "../Services/PaymentServices";
import { InputField } from "../../../components/FormField/InputField";
import { Oval } from "react-loader-spinner";

const PayoutDetailsForm = ({
  form,
  payoutDetails,
  setOverview,
  setForm,
  setLoading,
  loading,
}) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
        <Building2 className="h-5 w-5 text-[#2DD4BF]" />
        Payout details
      </h2>

      <p className="mt-1.5 text-sm text-gray-500">
        We store only masked account information. Use Stripe Connect or a payout
        provider before moving real money in production.
      </p>

      <form
        onSubmit={(event) =>
          savePayoutDetails(event, form, setOverview, setForm, setLoading)
        }
        className="mt-5 space-y-4"
      >
        <InputField
          label="Account holder"
          name="accountHolderName"
          type="text"
          size="s"
          value={form.accountHolderName}
          onChange={(event) => handlePaymentChange(event, setForm)}
        />

        <InputField
          label="Bank name"
          name="bankName"
          type="text"
          size="s"
          value={form.bankName}
          onChange={(event) => handlePaymentChange(event, setForm)}
        />

        <InputField
          label="Account number"
          name="accountNumber"
          size="s"
          value={form.accountNumber}
          onChange={(event) => handlePaymentChange(event, setForm)}
          placeholder={
            payoutDetails.accountLast4
              ? `Saved ending ${payoutDetails.accountLast4}`
              : ""
          }
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            label="IFSC"
            name="ifsc"
            size="s"
            value={form.ifsc}
            onChange={(event) => handlePaymentChange(event, setForm)}
          />

          <InputField
            label="UPI ID"
            name="upiId"
            size="s"
            value={form.upiId}
            onChange={(event) => handlePaymentChange(event, setForm)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-b from-[#99F6E4] via-[#5EEAD4] to-[#2DD4BF] px-5 py-3.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {loading ? (
            <Oval
              height={18}
              width={18}
              color="#FFFFFF"
              visible={true}
              ariaLabel="oval-loading"
            />
          ) : (
            <>
              <Save className="h-4 w-4" /> Save payout details
            </>
          )}
        </button>
      </form>
    </section>
  );
};

export default PayoutDetailsForm;
