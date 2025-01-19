import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import PetListing from "../pages/PetListing/PetListing";
import SignUp from "../pages/SignUp/SignUp";





const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <p>404 not found</p>,
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
  }
])

export default router;