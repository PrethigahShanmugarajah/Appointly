import { useEffect, useMemo, useState } from "react";
import {
  getDashboardBookings,
  getDashboardPaymentOverview,
  getDashboardServices,
  getDashboardUser,
} from "../Services/DashboardServices";
import {
  getBookingTrend,
  getEarningTrend,
  getMonthlyEarningsTrend,
  getTopServices,
  getUpcomingBookings,
} from "../../../utils/dashboard";
import AppLayout from "../../../components/AppLayout";
import DashboardHeader from "../Components/DashboardHeader";
import DashboardHero from "../Components/DashboardHero";
import DashboardStats from "../Components/DashboardStats";
import BookingOverview from "../Components/BookingOverview";
import TopServices from "../Components/TopServices";
import EarningsOverview from "../Components/EarningsOverview";
import UpcomingBookings from "../Components/UpcomingBookings";
import Integrations from "../Components/Integrations";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [copyMessage, setCopyMessage] = useState("");
  const [graphFilter, setGraphFilter] = useState("daily");

  useEffect(() => {
    const loadDashboard = async () => {
      if (!localStorage.getItem("token")) return;
      const [meResponse, servicesResponse, bookingsResponse, paymentsResponse] =
        await Promise.all([
          getDashboardUser(),
          getDashboardServices(),
          getDashboardBookings(),
          getDashboardPaymentOverview(),
        ]);
      setUser(meResponse.user);
      setServices(servicesResponse.services || []);
      setBookings(bookingsResponse.bookings || []);
      setWallet(paymentsResponse.wallet || null);
    };
    loadDashboard().catch(() => {});
  }, []);

  const publicLink = user?.slug
    ? `${window.location.origin}/book/${user.slug}`
    : "";

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "confirmed",
  );

  const rescheduledBookings = bookings.filter(
    (booking) => booking.isRescheduled,
  );

  const cancelledBookings = bookings.filter(
    (booking) =>
      booking.status === "cancelled" || booking.status === "payment_failed",
  );

  const paidBookings = bookings.filter(
    (booking) => booking.paymentStatus === "paid",
  );

  const monthlyEarningsTrend = useMemo(
    () => getMonthlyEarningsTrend(paidBookings),
    [paidBookings],
  );

  const bookingTrend = useMemo(
    () => getBookingTrend(bookings, graphFilter),
    [bookings, graphFilter],
  );
  const earningTrend = useMemo(
    () => getEarningTrend(paidBookings, graphFilter),
    [paidBookings, graphFilter],
  );

  const topServices = useMemo(
    () => getTopServices(services, bookings),
    [services, bookings],
  );

  const upcomingBookings = useMemo(
    () => getUpcomingBookings(bookings),
    [bookings],
  );

  const copyPublicLink = async () => {
    if (!publicLink) return;
    await navigator.clipboard.writeText(publicLink);
    setCopyMessage("Copied");
    window.setTimeout(() => setCopyMessage(""), 1800);
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl p-4 md:p-10 space-y-8 min-h-screen text-gray-800 tracking-tight font-sans">
        <DashboardHeader user={user} />

        {/* -------- Hero Cards -------- */}
        <DashboardHero
          publicLink={publicLink}
          copyPublicLink={copyPublicLink}
          copyMessage={copyMessage}
        />

        {/* -------- 4 Stats Cards -------- */}
        <DashboardStats
          bookings={bookings}
          confirmedBookings={confirmedBookings}
          rescheduledBookings={rescheduledBookings}
          paidBookings={paidBookings}
        />

        {/* -------- Charts Section -------- */}
        <BookingOverview
          bookingTrend={bookingTrend}
          graphFilter={graphFilter}
          setGraphFilter={setGraphFilter}
          confirmedBookings={confirmedBookings}
          rescheduledBookings={rescheduledBookings}
          cancelledBookings={cancelledBookings}
        />

        {/* -------- Bottom Section: Top Services & Earnings Overview -------- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* -------- Top Services -------- */}
          <TopServices topServices={topServices} bookings={bookings} />

          {/* -------- Earnings Overview with BAR CHART -------- */}
          <EarningsOverview
            wallet={wallet}
            monthlyEarningsTrend={monthlyEarningsTrend}
            earningTrend={earningTrend}
            graphFilter={graphFilter}
            setGraphFilter={setGraphFilter}
          />
        </section>

        {/* -------- Upcoming Bookings & Integrations -------- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingBookings upcomingBookings={upcomingBookings} />

          <Integrations />
        </section>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
