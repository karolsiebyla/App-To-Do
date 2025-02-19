//src/routes/routes.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PrivateRoute = () => {
  const user = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export const PublicRoute = () => {
  const user = useAuth();
  return !user ? <Outlet /> : <Navigate to="/" />;
};
