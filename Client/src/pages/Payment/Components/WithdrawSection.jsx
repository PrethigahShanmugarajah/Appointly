import { ArrowDownToLine } from "lucide-react";
import { formatAmount } from "../../../utils/payment";
import { submitWithdrawal } from "../Services/PaymentServices";
import { useAppContext } from "../../../context/appContext";
import { InputField } from "../../../components/FormField/InputField";
import { Oval } from "react-loader-spinner";

const WithdrawSection = ({
  wallet,
  payoutDetails,
  withdrawalAmount,
  setWithdrawalAmount,
  setLoading,
  loading,
  loadOverview,
}) => {
  const { CURRENCY } = useAppContext();

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
        <ArrowDownToLine className="h-5 w-5 text-[#2DD4BF]" />
        Withdraw balance
      </h2>

      <form
        onSubmit={(event) =>
          submitWithdrawal(
            event,
            withdrawalAmount,
            setWithdrawalAmount,
            setLoading,
            loadOverview,
          )
        }
        className="mt-4 flex flex-col gap-3 sm:flex-row"
      >
        <InputField
          type="number"
          min="1"
          step="0.01"
          size="s"
          value={withdrawalAmount}
          onChange={(event) => setWithdrawalAmount(event.target.value)}
          placeholder={formatAmount(wallet.available)}
          iconLeft={<span className="text-sm">{CURRENCY}</span>}
        />

        <button
          type="submit"
          disabled={loading || !payoutDetails.isComplete}
          className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-b from-[#99F6E4] via-[#5EEAD4] to-[#2DD4BF] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity disabled:opacity-60"
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
              <ArrowDownToLine className="h-4 w-4" />
              Request
            </>
          )}
        </button>
      </form>

      {!payoutDetails.isComplete && (
        <p className="mt-3 text-sm text-gray-500">
          Save payout details before requesting a withdrawal.
        </p>
      )}
    </section>
  );
};

export default WithdrawSection;
