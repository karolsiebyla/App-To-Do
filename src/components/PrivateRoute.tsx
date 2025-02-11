import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = useAuth();
  console.log("PrivateRoute: user status:", user);

  if (!user) {
    console.log("PrivateRoute: user not found, redirecting to /login");
    return <Navigate to="/login" />;
  }

  console.log("PrivateRoute: user authenticated, rendering children");
  return children;
};

export default PrivateRoute;
