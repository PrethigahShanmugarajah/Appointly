import { toast } from "react-toastify";
import {
  createPublicBooking,
  requestPublicBookingOtp,
  verifyPublicBookingOtp,
} from "../../../services/mutation";
import { getPublicBusiness, getPublicSlots } from "../../../services/fetch";

/* -------- Load public business -------- */
export const loadPublicBusiness = async (
  slug,
  setBusiness,
  setServices,
  setForm,
) => {
  try {
    const data = await getPublicBusiness(slug);

    setBusiness(data.business);
    setServices(data.services || []);

    setForm((prev) => ({
      ...prev,
      serviceId: data.services?.[0]?._id || "",
    }));
  } catch {
    //
  }
};

/* -------- Load public slots -------- */
export const loadPublicSlots = async (
  slug,
  serviceId,
  date,
  setSelectedSlot,
  setSlots,
) => {
  if (!serviceId || !date) return;

  setSelectedSlot(null);

  try {
    const data = await getPublicSlots(slug, {
      serviceId,
      date,
    });

    setSlots(data.slots || []);
  } catch {
    setSlots([]);
  }
};

/* -------- Handle booking form change -------- */
export const handlePublicBookingChange = async (
  event,
  form,
  otpVerified,
  slug,
  setForm,
  setOtpVerified,
  setOtpSentTo,
) => {
  const { name, value } = event.target;

  if (name === "emailOtp") {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 6);

    setForm((prev) => ({ ...prev, emailOtp: digitsOnly }));

    if (otpVerified) setOtpVerified(false);

    if (digitsOnly.length === 6 && form.customerEmail) {
      try {
        await verifyPublicBookingOtp(slug, {
          customerEmail: form.customerEmail,
          emailOtp: digitsOnly,
        });

        setOtpVerified(true);
      } catch {
        setOtpVerified(false);
      }
    }

    return;
  }

  if (name === "customerEmail") {
    setOtpVerified(false);
    setOtpSentTo("");
  }

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

/* -------- Send booking OTP -------- */
export const sendBookingOtp = async (
  form,
  slug,
  setOtpLoading,
  setOtpSentTo,
  setOtpCooldown,
) => {
  if (!form.customerEmail) {
    toast.warn("Enter your email first");
    return;
  }

  setOtpLoading(true);

  try {
    await requestPublicBookingOtp(slug, form.customerEmail);

    setOtpSentTo(form.customerEmail.trim().toLowerCase());
    setOtpCooldown(30);
  } catch (error) {
    console.error("Send Booking OTP Error:", error);
  } finally {
    setOtpLoading(false);
  }
};

/* -------- Submit public booking -------- */
export const submitPublicBooking = async (
  event,
  form,
  selectedSlot,
  slug,
  setLoading,
  setCalendarUrl,
  setSelectedSlot,
  setOtpVerified,
) => {
  event.preventDefault();

  if (!selectedSlot) {
    toast.warn("Choose a time slot");
    return;
  }

  setLoading(true);

  try {
    const data = await createPublicBooking(slug, {
      ...form,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
    });

    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
      return;
    }

    setCalendarUrl(data.customerCalendarUrl || "");
    setSelectedSlot(null);
    setOtpVerified(true);
  } finally {
    setLoading(false);
  }
};
