import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const hasAdminToken = Boolean(localStorage.getItem("adminToken"));

  if (!hasAdminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
