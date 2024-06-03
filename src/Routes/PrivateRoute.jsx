
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook/useAuth";

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();


    if(loading){
        return ( 
           

        <span className="loading mx-auto flex justify-center items-center loading-bars text-purple-700"></span>
    );

    }
    if(user) {
        return children;
    }
    return <Navigate to='/' state={{from: location}} replace>

    </Navigate>
};

export default PrivateRoute;