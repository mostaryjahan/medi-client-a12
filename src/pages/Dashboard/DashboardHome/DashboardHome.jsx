import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hook/useAuth";
import PaymentHistory from "../User/PaymentHistory";

const DashboardHome = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div>
      <Helmet>
        <title>Medi corner | Dashboard Home</title>
      </Helmet>

      {user.role === "admin" && <h2>Admin home</h2>}

      {user.role === "seller" && <h2>Seller Home</h2>}

      {user.role === "user" && 
    
      <PaymentHistory></PaymentHistory>
     
      }
    </div>
  );
};

export default DashboardHome;
