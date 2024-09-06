import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hook/useAuth";
import PaymentHistory from "../User/PaymentHistory";
import AdminHome from "../Admin/AdminHome";
import SellerHome from "../Seller/SellerHome";

const DashboardHome = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div>
      <Helmet>
        <title>MediCorner | Dashboard Home</title>
      </Helmet>

      {user.role === "admin" && <h2>
        <AdminHome></AdminHome>
        </h2>}

      {user.role === "seller" && <h2>
       <SellerHome></SellerHome>
        </h2>}

      {user.role === "user" && 
    
      <PaymentHistory></PaymentHistory>
     
      }
    </div>
  );
};

export default DashboardHome;
