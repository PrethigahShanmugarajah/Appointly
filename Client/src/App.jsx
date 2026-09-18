// Client / src / App.jsx
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "./pages/Admin/AdminLoginPage/View/AdminLoginPage";
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage/View/AdminDashboardPage";
import AdminProtectedRoute from "./components/ProtectedRoute/AdminProtectedRoute";
import { PublicOnlyRoute } from "./components/ProtectedRoute/PublicOnlyRoute";
import AuthPage from "./pages/AuthPage/View/AuthPage";

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
      </Routes>
    </>
  );
};

export default App;
