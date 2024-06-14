import { Outlet } from "react-router-dom";

const NoNavFooterLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default NoNavFooterLayout;