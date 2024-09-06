import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hook/useAdmin";
import useAuth from "../Hook/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <div className="loader mx-auto mt-28 "></div>;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
