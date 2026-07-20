import { Navigate } from "react-router-dom";

export default function AdminGuard({ children }) {
  const access = sessionStorage.getItem("admin_access");

  if (!access) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}