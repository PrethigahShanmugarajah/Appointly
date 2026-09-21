// Client / src / App.jsx
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "./pages/Admin/AdminLoginPage/View/AdminLoginPage";
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage/View/AdminDashboardPage";
import AdminProtectedRoute from "./components/ProtectedRoute/AdminProtectedRoute";
import { PublicOnlyRoute } from "./components/ProtectedRoute/PublicOnlyRoute";
import AuthPage from "./pages/AuthPage/View/AuthPage";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage/View/DashboardPage";
import ProfilePage from "./pages/ProfilePage/View/ProfilePage";
import BookingsPage from "./pages/BookingsPage/View/BookingsPage";
import BookingSuccessPage from "./pages/BookingSuccessPage/View/BookingSuccessPage";
import BookingCancelPage from "./pages/BookingCancelPage/View/BookingCancelPage";
import Availability from "./pages/Availability/View/Availability";
import Service from "./pages/Service/View/Service";
import Payment from "./pages/Payment/View/Payment";
import PublicBooking from "./pages/PublicBooking/View/PublicBooking";
import PrivacyPolicy from "./pages/PrivacyPolicy/View/PrivacyPolicy";

const App = () => {
  return (
    <>
      <ToastContainer autoClose={3000} newestOnTop={true} />

      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboardPage />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <AuthPage />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <BookingsPage />
            </ProtectedRoute>
          }
        />

        <Route path="/bookings/success" element={<BookingSuccessPage />} />

        <Route path="/bookings/cancelled" element={<BookingCancelPage />} />

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
      </Routes>
    </>
  );
};

export default App;
