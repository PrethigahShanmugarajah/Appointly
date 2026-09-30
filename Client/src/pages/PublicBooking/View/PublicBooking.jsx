import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { today } from "../../../utils/date";
import { brandThemeStyles, themeBannerImages } from "../../../utils/theme";
import {
  loadPublicBusiness,
  loadPublicSlots,
} from "../Services/PublicBookingServices";
import BusinessSidebar from "../Components/BusinessSidebar";
import BookingForm from "../Components/BookingForm";

const PublicBooking = () => {
  const { slug } = useParams();
  const [business, setBusiness] = useState(null);
  const [services, setServices] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [calendarUrl, setCalendarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSentTo, setOtpSentTo] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [form, setForm] = useState({
    serviceId: "",
    date: today,
    customerName: "",
    customerEmail: "",
    customerAvatar: "A1.png",
    emailOtp: "",
    notes: "",
  });

  const selectedService = useMemo(
    () => services.find((service) => service._id === form.serviceId),
    [services, form.serviceId],
  );

  const brandTheme =
    brandThemeStyles[business?.brandTheme] || brandThemeStyles.green;

  const accent = business?.brandAccent || brandTheme.accent;
  const brandStyleVars = {
    "--brand-accent": accent,
    "--brand-panel": brandTheme.panel,
  };
  const bannerImage =
    themeBannerImages[business?.brandTheme] || themeBannerImages.green;

  useEffect(() => {
    if (otpCooldown <= 0) return;
    const interval = setInterval(() => {
      setOtpCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [otpCooldown]);

  useEffect(() => {
    loadPublicBusiness(slug, setBusiness, setServices, setForm);
  }, [slug]);

  useEffect(() => {
    loadPublicSlots(slug, form.serviceId, form.date, setSelectedSlot, setSlots);
  }, [slug, form.serviceId, form.date]);

  return (
    <div
      className="min-h-screen bg-[#F4F4F5] text-gray-900 py-6 md:py-10 px-4 md:px-8"
      style={brandStyleVars}
    >
      <main className="mx-auto grid max-w-275 gap-6 lg:gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        {/* -------- Left : Business sidebar -------- */}
        <BusinessSidebar
          business={business}
          services={services}
          form={form}
          setForm={setForm}
          accent={accent}
          bannerImage={bannerImage}
        />

        {/* -------- Right : Booking form -------- */}
        <BookingForm
          selectedService={selectedService}
          accent={accent}
          form={form}
          setForm={setForm}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
          slug={slug}
          loading={loading}
          setLoading={setLoading}
          setCalendarUrl={setCalendarUrl}
          setOtpVerified={setOtpVerified}
          otpVerified={otpVerified}
          setOtpSentTo={setOtpSentTo}
          otpSentTo={otpSentTo}
          otpLoading={otpLoading}
          setOtpLoading={setOtpLoading}
          otpCooldown={otpCooldown}
          setOtpCooldown={setOtpCooldown}
          slots={slots}
          calendarUrl={calendarUrl}
          today={today}
        />
      </main>
    </div>
  );
};

export default PublicBooking;
