import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Error from "../Error/Error";
import CategoryCard from "../pages/Home/Home/CategoryCard/CategoryCard";
import CategoryDetails from "../pages/Home/Home/CategoryCard/CategoryDetails";
import Shop from "../components/Shop/Shop";
import Discount from "../pages/Home/Home/Discount/Discount";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "../pages/UpdateProfile/UpdateProfile";
import Dashboard from "../LayOut/Dashboard";
import Cart from "../pages/Dashboard/User/Cart";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";

import Manage from "../pages/Dashboard/Seller/Manage";
import Ask from "../pages/Dashboard/Seller/Ask";
import Ad from "../pages/Dashboard/Admin/Ad";
import ManageCategory from "../pages/Dashboard/Admin/ManageCategory";

import CheckOutPayment from "../pages/Dashboard/payment/CheckOutPayment";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import Invoice from "../pages/Dashboard/payment/Invoice";
import PaymentHistory from "../pages/Dashboard/User/PaymentHistory";
import PaymentManage from "../pages/Dashboard/Admin/PaymentManage";
import Sales from "../pages/Dashboard/Admin/Sales";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import SellerHome from "../pages/Dashboard/Seller/SellerHome";
import SellerPayment from "../pages/Dashboard/Seller/SellerPayment";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";




 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <Error></Error>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
      
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/signUp",
          element: <SignUp></SignUp>,
        },
        {
          path: '/updateProfile',
          element:<UpdateProfile></UpdateProfile>
        },
        {
          path: '/categoryCard',
          element: <CategoryCard></CategoryCard>
       },
       {
         path: '/categoryDetails/:category',
         element: <CategoryDetails></CategoryDetails>,

       },
       {
        path: '/discount/:discount',
        element: <Discount></Discount>,
      },
       {
        path:'/shop',
        element: <Shop></Shop>
       },
       {
        path: '/payment',
        element: <PrivateRoute><CheckOutPayment></CheckOutPayment></PrivateRoute>
     },
     {
      path: '/invoice',
      element: <Invoice />
     },
  
      ]
    },
    {
      path: `/dashboard`,
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      errorElement: <Error></Error>,
      children: [
      {
         index: true,
         element: <DashboardHome></DashboardHome>
      },
      {
        path: '/dashboard/allUsers',
        element:<AdminRoute><AllUsers></AllUsers></AdminRoute> 

      },
      {
          path: '/dashboard/ad',
          element:<AdminRoute><Ad></Ad></AdminRoute>
      },
      {
         path: '/dashboard/manageCategory/:category',
         element: <AdminRoute><ManageCategory></ManageCategory></AdminRoute>,
         
      },
      {
        path: '/dashboard/paymentManage',
        element: <AdminRoute><PaymentManage></PaymentManage></AdminRoute>,
        
     },
     {
        path: '/dashboard/sales',
        element: <AdminRoute><Sales></Sales></AdminRoute>
     },
     {
        path: '/dashboard/adminHome',
        element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
     },

      //seller
      {
        path: '/dashboard/sellerHome',
        element: <SellerRoute><SellerHome></SellerHome></SellerRoute>
      },
      {
        path: '/dashboard/manageProducts',
        element: <SellerRoute><Manage></Manage></SellerRoute>
      },
      {
         path: '/dashboard/ask',
         element: <SellerRoute><Ask></Ask></SellerRoute>
      },
      {
        path: '/dashboard/sellerPayment',
        element: <SellerRoute><SellerPayment></SellerPayment></SellerRoute>
      },

      //user
      { path: '/dashboard/cart',
        element: <Cart></Cart>
       },
     
      {
        
          path: '/dashboard/paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        
      },

      ]
    }
  ]);