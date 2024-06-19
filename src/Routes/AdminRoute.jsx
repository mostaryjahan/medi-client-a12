import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hook/useAdmin";
import useAuth from "../Hook/useAuth";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();


    if(loading || isAdminLoading){
        return ( 
        <span className="loading flex justify-center items-center loading-bars text-blue-500 loading-lg"></span>
    );

    }
    if(user && isAdmin) {
        return children;
    }
    return <Navigate to='/' state={{from: location}} replace>

    </Navigate>
};

export default AdminRoute;