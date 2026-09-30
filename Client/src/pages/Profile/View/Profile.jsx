import { useAppContext } from "../../../context/appContext";
import { useEffect, useState } from "react";
import { getPublicBookingLink } from "../../../utils/profile";
import { brandThemeStyles, themeBannerImages } from "../../../utils/theme";
import { toast } from "react-toastify";
import {
  getGoogleCalendarConnectUrl,
  loadProfileUser,
  saveProfile,
} from "../Services/ProfileServices";
import AppLayout from "../../../components/AppLayout";
import ProfileHeader from "../Components/ProfileHeader";
import PublicBookingLink from "../Components/PublicBookingLink";
import IntegrationsGrid from "../Components/IntegrationsGrid";
import BusinessDetailsForm from "../Components/BusinessDetailsForm";
import PublicPreview from "../Components/PublicPreview";
import CustomerView from "../Components/CustomerView";

const Profile = () => {
  const { TIME_ZONE } = useAppContext();

  const [form, setForm] = useState({
    businessName: "",
    businessDescription: "",
    timezone: TIME_ZONE,
    brandTheme: "green",
    brandAccent: "#0891B2",
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [connectingCalendar, setConnectingCalendar] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");

  const publicLink = getPublicBookingLink(user?.slug);

  const dynamicThemeUI =
    brandThemeStyles[form.brandTheme] || brandThemeStyles.green;

  const brandStyleVars = {
    "--brand-accent": form.brandAccent || dynamicThemeUI.accent,
    "--brand-panel": dynamicThemeUI.panel,
  };

  const previewBannerImage =
    themeBannerImages[form.brandTheme] || themeBannerImages.green;

  useEffect(() => {
    const loadUser = async () => {
      if (!localStorage.getItem("token")) {
        toast.error("Please log in before editing your profile");
        return;
      }

      try {
        const nextUser = await loadProfileUser();

        if (!nextUser) {
          toast.error("Could not load profile details");
          return;
        }

        setUser(nextUser);
        setForm({
          businessName: nextUser.businessName || "Mental Clinic",
          businessDescription: nextUser.businessDescription || "",
          timezone: nextUser.timezone || TIME_ZONE,
          brandTheme: nextUser.brandTheme || "green",
          brandAccent: nextUser.brandAccent || "#0891B2",
        });
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Could not load profile details",
        );
      }
    };

    loadUser();
  }, [TIME_ZONE]);

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const chooseTheme = (theme) => {
    setForm((prev) => ({
      ...prev,
      brandTheme: theme.id,
      brandAccent: theme.accent,
    }));
  };

  const copyPublicLink = async () => {
    if (!publicLink) return;
    await navigator.clipboard.writeText(publicLink);
    setCopyMessage("Copied!");
    window.setTimeout(() => setCopyMessage(""), 1800);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!localStorage.getItem("token")) {
      toast.error("Please log in before editing your profile");
      return;
    }

    setLoading(true);

    try {
      const nextUser = await saveProfile(form);
      setUser(nextUser);
    } finally {
      setLoading(false);
    }
  };

  const connectGoogleCalendar = async () => {
    setConnectingCalendar(true);

    try {
      const url = await getGoogleCalendarConnectUrl();
      window.location.href = url;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Could not start Google Calendar connection",
      );
      setConnectingCalendar(false);
    }
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
        {/* -------- LEFT COLUMN -------- */}
        <div className="flex flex-col gap-6">
          {/* -------- Header & Illustration -------- */}
          <ProfileHeader />

          {/* -------- Public Booking Link Card -------- */}
          <PublicBookingLink
            publicLink={publicLink}
            copyPublicLink={copyPublicLink}
            copyMessage={copyMessage}
          />

          {/* -------- Integrations Grid -------- */}
          <IntegrationsGrid
            connectGoogleCalendar={connectGoogleCalendar}
            connectingCalendar={connectingCalendar}
            googleCalendarConnected={user?.googleCalendarConnected}
          />
        </div>

        {/* -------- RIGHT COLUMN -------- */}
        <BusinessDetailsForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          chooseTheme={chooseTheme}
          loading={loading}
        />

        {/* -------- BOTTOM FULL WIDTH AREA (Preview + Customer View) -------- */}
        <div
          className="col-span-1 lg:col-span-2 grid grid-cols-1 lg:grid-cols-[1.6fr_0.8fr] gap-6 mt-4"
          style={brandStyleVars}
        >
          {/* -------- Public Preview Block -------- */}
          <PublicPreview
            form={form}
            previewBannerImage={previewBannerImage}
            brandStyleVars={brandStyleVars}
          />

          {/* -------- Customer View Section -------- */}
          <CustomerView form={form} dynamicThemeUI={dynamicThemeUI} />
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
