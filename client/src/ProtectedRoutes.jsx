import { useAuth } from "./context/authcontext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
