import { toast } from "react-toastify";
import { getPaymentOverview } from "../../../services/fetch";
import {
  requestWithdrawal,
  updatePayoutDetails,
} from "../../../services/mutation";

/* -------- Fetch payment overview -------- */
export const fetchPaymentOverview = async (setOverview, setForm) => {
  const data = await getPaymentOverview();

  setOverview(data);

  setForm((prev) => ({
    ...prev,
    accountHolderName: data.payoutDetails?.accountHolderName || "",
    bankName: data.payoutDetails?.bankName || "",
    ifsc: data.payoutDetails?.ifsc || "",
    upiId: data.payoutDetails?.upiId || "",
  }));
};

/* -------- Load payment overview -------- */
export const loadPaymentOverview = (setOverview, setForm) => {
  if (!localStorage.getItem("token")) {
    toast.warn("Please log in to manage payment details");
    return;
  }

  return fetchPaymentOverview(setOverview, setForm);
};

/* -------- Handle payment form change -------- */
export const handlePaymentChange = (event, setForm) => {
  setForm((prev) => ({
    ...prev,
    [event.target.name]: event.target.value,
  }));
};

/* -------- Save payout details -------- */
export const savePayoutDetails = async (
  event,
  form,
  setOverview,
  setForm,
  setLoading,
) => {
  event.preventDefault();
  setLoading(true);

  try {
    const data = await updatePayoutDetails(form);

    setOverview((prev) => ({
      ...prev,
      payoutDetails: data.payoutDetails,
    }));

    setForm((prev) => ({
      ...prev,
      accountNumber: "",
    }));
  } catch (error) {
    console.error("Save Payout Details Error:", error);
  } finally {
    setLoading(false);
  }
};

/* -------- Submit withdrawal -------- */
export const submitWithdrawal = async (
  event,
  withdrawalAmount,
  setWithdrawalAmount,
  setLoading,
  loadOverview,
) => {
  event.preventDefault();
  setLoading(true);

  try {
    const amount = Math.round(Number(withdrawalAmount) * 100);

    await requestWithdrawal(amount);

    setWithdrawalAmount("");

    await loadOverview();
  } catch (error) {
    console.error("Submit Withdrawal Error:", error);
  } finally {
    setLoading(false);
  }
};
