import { useState } from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  HomeIcon,
  UserCircleIcon,
  InboxIcon,
  ClipboardDocumentIcon,
  HeartIcon,
  CurrencyDollarIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import useRole from "../../../../hooks/useRole";



const Sidebar = () => {
  const { logOut } = useAuth();
  const [role, isLoading] = useRole();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);


  return (
    <div>
      <div className={`md:fixed top-0 p-4 left-0 h-full shadow-lg bg-white  absolute inset-y-0 transition-transform duration-300 ease-in-out transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-10`}
      >
        <div className="p-8 rounded-lg bg-orange-100 flex items-center border-b gap-4 border-gray-400">
          <img
            src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
            alt="brand"
            className="h-8 w-8"
          />
          <Typography variant="h5" >
            Dashboard
          </Typography>
        </div>
        <List>
          {
            role === 'admin' && <><NavLink></NavLink></>
          }

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? " text-blue-500 font-medium"
                : " text-gray-600"
            }
          >
            <ListItem>
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5" />
              </ListItemPrefix>
              Home
            </ListItem>
          </NavLink>
          <NavLink
            to="/dashboard/add-pet"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-medium"
                : "text-gray-600"
            }
          >
            <ListItem>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Add a Pet
            </ListItem>
          </NavLink>
          <NavLink
            to="/dashboard/my-added-pets"
            className={({ isActive }) =>
              isActive
                ? " text-blue-500 font-medium"
                : " text-gray-600"
            }
          >
            <ListItem>
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              My Added Pets
            </ListItem>
          </NavLink>
          <NavLink
            to="/dashboard/adoption-requests"
            className={({ isActive }) =>
              isActive
                ? " text-blue-500 font-medium"
                : " text-gray-600"
            }
          >
            <ListItem>
              <ListItemPrefix>
                <HeartIcon className="h-5 w-5" />
              </ListItemPrefix>
              Adoption Requests
            </ListItem>
          </NavLink>
          <NavLink
            to="/dashboard/create-donation"
            className={({ isActive }) =>
              isActive
                ? " text-blue-500 font-medium"
                : " text-gray-600"
            }
          >
            <ListItem>
              <ListItemPrefix>
                <CurrencyDollarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Create Donation Campaign
            </ListItem>
          </NavLink>
          <NavLink
            to="/dashboard/my-donation-campaigns"
            className={({ isActive }) =>
              isActive
                ? " text-blue-500 font-medium"
                : " text-gray-600"
            }
          >
            <ListItem>
              <ListItemPrefix>
                <ClipboardDocumentIcon className="h-5 w-5" />
              </ListItemPrefix>
              My Donation Campaigns
            </ListItem>
          </NavLink>
          <NavLink
            to="/dashboard/my-donations"
            className={({ isActive }) =>
              isActive
                ? " text-blue-500 font-medium"
                : " text-gray-600"
            }
          >
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              My Donations
            </ListItem>
          </NavLink>
          <hr className="my-2 border-blue-gray-300" />
          <div>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                isActive
                  ? " text-blue-500 font-medium"
                  : " text-gray-600"
              }
            >
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Profile
              </ListItem>
            </NavLink>
            <ListItem onClick={logOut} className="text-red-600 bg-red-500/10">
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </div>
        </List>
      </div>

      <div className="bg-white p-4 shadow-md flex items-center justify-between border-2 md:hidden">
        <Typography variant="h6">User Dashboard</Typography>
        <IconButton variant="text" size="lg" onClick={toggleDrawer}>
          {isDrawerOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default Sidebar;