import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../pages/Home/Home/Home";
import Error from "../Error/Error";
import CategoryCard from "../pages/Home/Home/CategoryCard/CategoryCard";
import CategoryDetails from "../pages/Home/Home/CategoryCard/CategoryDetails";
import Shop from "../components/Shop/Shop";
// import Login from "../pages/Login/Login"

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
      
        // {
        //   path: "/login",
        //   element: <Login></Login>,
        // },
        // {
        //   path: "/signUp",
        //   element: <SignUp></SignUp>,
        // },
        {
          path: '/categoryCard',
          element: <CategoryCard></CategoryCard>
       },
       {
         path: '/categoryDetails/:category',
         element: <CategoryDetails></CategoryDetails>,
       },
       {
        path:'/shop',
        element: <Shop></Shop>
       },
      ]
    },
  ]);