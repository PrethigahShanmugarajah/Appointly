// Client / src / components / ProtectedRoute / PublicOnlyRoute.jsx
import { Navigate } from "react-router-dom";

export const PublicOnlyRoute = ({ children }) => {
  const hasToken = Boolean(localStorage.getItem("token"));

  if (hasToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};
