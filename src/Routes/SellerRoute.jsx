import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import useSeller from "../Hook/useSeller";

const SellerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isSeller, isSellerLoading] = useSeller();
  const location = useLocation();

  if (loading || isSellerLoading) {
    return <div className="loader mx-auto mt-28 "></div>;
  }
  if (user && isSeller) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;
