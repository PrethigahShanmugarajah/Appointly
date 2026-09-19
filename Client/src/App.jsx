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
      </Routes>
    </>
  );
};

export default App;
