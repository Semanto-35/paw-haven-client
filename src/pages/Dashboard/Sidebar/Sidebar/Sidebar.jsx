import { useState } from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Button,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
  TableCellsIcon,
  WalletIcon,
  KeyIcon,
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
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import useRole from "../../../../hooks/useRole";



const Sidebar = () => {
  const { user, logOut } = useAuth();
  const [role] = useRole();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);


  return (
    <div>
      <div className={`md:fixed top-0 p-4 left-0 h-full shadow-lg bg-white dark:bg-blue-gray-100 absolute inset-y-0 transition-transform duration-300 ease-in-out transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-10 overflow-y-auto`}
      >
        <div className="px-8 py-4 rounded-lg dark:bg-gray-700 dark:text-gray-100 flex flex-col items-center">
          <Typography variant="h6">
            Welcome {user?.displayName.split(" ")[0]}
          </Typography>
          <img src={user?.photoURL} alt=""
            className="w-20 h-20 object-cover rounded-full my-3"
          />
          <Typography variant="h5" >
            {user?.displayName}
          </Typography>
          <Typography  >
            {user?.email}
          </Typography>
          <Typography className="flex items-center gap-1">
            <KeyIcon className="w-4 h-4" /> {role}
          </Typography>
          <Link to={'/'}>
            <Button variant="text" color="white" className="mt-2">
              back to home
            </Button>
          </Link>
        </div>
        <List>
          <NavLink
            to="/dashboard"
            end
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
          {
            role === 'admin' && (
              <>
                <NavLink
                  to="admin/manage-users"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 font-medium"
                      : "text-gray-600"
                  }
                >
                  <ListItem>
                    <ListItemPrefix>
                      <Cog6ToothIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Manage Users
                  </ListItem>
                </NavLink>
                <NavLink
                  to="admin/all-pets"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 font-medium"
                      : "text-gray-600"
                  }
                >
                  <ListItem>
                    <ListItemPrefix>
                      <TableCellsIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    All Pets
                  </ListItem>
                </NavLink>
                <NavLink
                  to="admin/all-donations"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 font-medium"
                      : "text-gray-600"
                  }
                >
                  <ListItem>
                    <ListItemPrefix>
                      <WalletIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    All Donations
                  </ListItem>
                </NavLink>
                <hr className="my-2 border-blue-gray-300" />
              </>
            )
          }
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
        <Typography variant="h6">{role === 'admin' ? "Admin" : "User"} Dashboard</Typography>
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