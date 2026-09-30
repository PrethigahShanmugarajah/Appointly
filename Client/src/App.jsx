import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/Admin/AdminLogin/View/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard/View/AdminDashboard";
import AdminProtectedRoute from "./components/ProtectedRoute/AdminProtectedRoute";
import { PublicOnlyRoute } from "./components/ProtectedRoute/PublicOnlyRoute";
import Auth from "./pages/Auth/View/Auth";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./pages/Dashboard/View/Dashboard";
import Profile from "./pages/Profile/View/Profile";
import Bookings from "./pages/Bookings/View/Bookings";
import BookingSuccess from "./pages/BookingSuccess/View/BookingSuccess";
import BookingCancel from "./pages/BookingCancel/View/BookingCancel";
import Availability from "./pages/Availability/View/Availability";
import Service from "./pages/Service/View/Service";
import Payment from "./pages/Payment/View/Payment";
import PublicBooking from "./pages/PublicBooking/View/PublicBooking";
import PrivacyPolicy from "./pages/PrivacyPolicy/View/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService/View/TermsOfService";

const App = () => {
  return (
    <>
      <ToastContainer autoClose={3000} newestOnTop={true} />

      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Auth />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />

        <Route path="/bookings/success" element={<BookingSuccess />} />

        <Route path="/bookings/cancelled" element={<BookingCancel />} />

        <Route
          path="/availability"
          element={
            <ProtectedRoute>
              <Availability />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Service />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        <Route path="/book/:slug" element={<PublicBooking />} />

        <Route path="/public/:slug" element={<PublicBooking />} />

        <Route path="/privacy" element={<PrivacyPolicy />} />

        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
    </>
  );
};

export default App;
