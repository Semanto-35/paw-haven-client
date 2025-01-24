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
import MyAddedpets from "../pages/Dashboard/UserDashboard/MyAddedPets/MyAddedpets";
import UpdatePet from "../pages/Dashboard/UserDashboard/UpdatePet/UpdatePet";
import CreateDonationCampaign from "../pages/Dashboard/UserDashboard/CreateDonation/CreateDonationCampaign";
import MyDonationCampaigns from "../pages/Dashboard/UserDashboard/MyCampaigns/MyDonationCampaigns";





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
      {
        path: '/dashboard/my-added-pets',
        element: <PrivateRoute><MyAddedpets /></PrivateRoute>
      },
      {
        path: '/dashboard/update-pet/:id',
        element: <PrivateRoute><UpdatePet /></PrivateRoute>
      },
      {
        path: '/dashboard/create-donation',
        element: <PrivateRoute><CreateDonationCampaign /></PrivateRoute>
      },
      {
        path: '/dashboard/my-donation-campaigns',
        element: <PrivateRoute><MyDonationCampaigns /></PrivateRoute>
      },
    ]
  },
])

export default router;