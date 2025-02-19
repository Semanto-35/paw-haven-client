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
import EditDonation from "../pages/Dashboard/UserDashboard/EditDonation/EditDonation";
import MyDonations from "../pages/Dashboard/UserDashboard/MyDonations/MyDonations";
import AdoptionRequests from "../pages/Dashboard/UserDashboard/AdoptionRequests/AdoptionRequests";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers";
import AllPets from "../pages/Dashboard/AdminDashboard/AllPets/AllPets";
import AllDonations from "../pages/Dashboard/AdminDashboard/AllDonatoins/AllDonations";
import PetDetails from "../pages/PetDetails/PetDetails";
import DonationCampaigns from "../pages/DonationCampaigns/DonationCampaigns";
import DonationDetails from "../pages/DonationDetails/DonationDetails";
import Overview from "../pages/Dashboard/UserDashboard/Overview/Overview";
import Profile from "../pages/Dashboard/Profile/Profile";





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
      {
        path: '/pets/:id',
        element: <PetDetails />
      },
      {
        path: '/donations',
        element: <DonationCampaigns />
      },
      {
        path: '/campaigns/:id',
        element: <DonationDetails />
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
        path: '/dashboard',
        element: <PrivateRoute><Overview /></PrivateRoute>
      },
      {
        path: '/dashboard/profile',
        element: <PrivateRoute><Profile /></PrivateRoute>
      },
      {
        path: '/dashboard/my-pets',
        element: <PrivateRoute><MyAddedpets /></PrivateRoute>
      },
      {
        path: '/dashboard/add-pet',
        element: <PrivateRoute><AddPet /></PrivateRoute>
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
      {
        path: '/dashboard/update-campaign/:id',
        element: <PrivateRoute><EditDonation /></PrivateRoute>
      },
      {
        path: '/dashboard/my-donations',
        element: <PrivateRoute><MyDonations /></PrivateRoute>
      },
      {
        path: '/dashboard/adoption-requests',
        element: <PrivateRoute><AdoptionRequests /></PrivateRoute>
      },
      {
        path: 'admin/manage-users',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        )
      },
      {
        path: 'admin/all-pets',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllPets />
            </AdminRoute>
          </PrivateRoute>
        )
      },
      {
        path: 'admin/all-donations',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllDonations />
            </AdminRoute>
          </PrivateRoute>
        )
      },
    ]
  },
])

export default router;