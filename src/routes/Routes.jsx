import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import PetListing from "../pages/PetListing/PetListing";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AddPet from "../pages/Dashboard/UserDashboard/AddPet/AddPet";





const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/pets',
        element: <PetListing />
      },
    ]
  },
  {
    path: '/signUp',
    element: <SignUp />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        path: '/dashboard/add-pet',
        element: <PrivateRoute><AddPet /></PrivateRoute>
      },
    ]
  },
])

export default router;