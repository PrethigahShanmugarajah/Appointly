// Client / src / components / ProtectedRoute / ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

export const ProtectedRoute = ({ children }) => {
  const { location } = useAppContext();

  const hasToken = Boolean(localStorage.getItem("token"));

  if (!hasToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};
