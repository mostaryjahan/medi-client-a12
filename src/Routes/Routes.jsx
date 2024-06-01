import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../pages/Home/Home/Home";
import Error from "../Error/Error";
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
      ]
    },
  ]);