import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import useSeller from "../Hook/useSeller";

const SellerRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isSeller, isSellerLoading] = useSeller();
    const location = useLocation();


    if(loading || isSellerLoading){
        return ( 
        <span className="loading flex justify-center items-center loading-bars text-blue-500 loading-lg"></span>
    );

    }
    if(user && isSeller) {
        return children;
    }
    return <Navigate to='/' state={{from: location}} replace>

    </Navigate>
};

export default SellerRoute;