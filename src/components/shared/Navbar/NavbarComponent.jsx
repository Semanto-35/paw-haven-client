import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Button, Menu, MenuHandler, MenuList, MenuItem, Avatar, ListItem, Typography, List, IconButton, Collapse, } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import { HomeIcon, LifebuoyIcon, WalletIcon, PowerIcon } from "@heroicons/react/24/solid";
import userImg from '../../../assets/icons/user.jpg';
import useAuth from "../../../hooks/useAuth";
import DarkModeToggle from "../DarkMode/DarkModeToggle";



const NavbarComponent = () => {
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const links = <>
    <NavLink
      to="/"
      className={({ isActive }) => `font-medium ${isActive ? 'text-blue-500 underline' : 'text-blue-gray'}`}
    >
      <ListItem className="flex items-center gap-1 py-2 pr-4">
        <HomeIcon className='w-5 h-5' />
        <Typography variant="small" className="font-medium">
          Home
        </Typography>
      </ListItem>
    </NavLink>
    <NavLink
      to="/pets"
      className={({ isActive }) => `font-medium ${isActive ? 'text-blue-500 underline' : 'text-blue-gray'}`}
    >
      <ListItem className="flex items-center gap-1 py-2 pr-4">
        <LifebuoyIcon className='w-5 h-5' />
        <Typography variant="small" className="font-medium">
          Pet Listing
        </Typography>
      </ListItem>
    </NavLink>
    <NavLink
      to="/donations"
      className={({ isActive }) => `font-medium ${isActive ? 'text-blue-500 underline' : 'text-blue-gray'}`}
    >
      <ListItem className="flex items-center gap-1 py-2 pr-4">
        <WalletIcon className='w-5 h-5' />
        <Typography variant="small" className="font-medium">
          Donation Campaigns
        </Typography>
      </ListItem>
    </NavLink>
  </>

  return (
    <Navbar fullWidth className="mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 max-w-7xl px-4 py-2 shadow-md">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img className="w-12" src="https://i.ibb.co.com/69vhxMW/paw-1.png" alt="Logo" />
          <Typography
            variant="h4"
            className=""
          >
            Pet Haven
          </Typography>
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:block">
          <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
            {links}
          </List>
        </div>

        {/* User Menu */}
        <div className="flex justify-end gap-3">
          <DarkModeToggle/>
          {user ? (
            <div className="hidden lg:block">
              <Menu allowHover placement="bottom-end">
                <MenuHandler>
                  <Avatar
                    variant="circular"
                    size="md"
                    alt="User"
                    withBorder
                    color="blue-gray"
                    className="p-0.5"
                    src={user?.photoURL}
                  />
                </MenuHandler>
                <MenuList className="p-1">
                  <div className="px-4 py-2">
                    <Typography variant="h6" color="blue-gray">
                      {user?.displayName}
                    </Typography>
                    <Typography variant="small" color="gray">
                      {user?.email}
                    </Typography>
                  </div>
                  <hr className="my-1" />
                  <MenuItem
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2"
                  >
                    <IdentificationIcon className="w-4 h-4" />
                    <Typography variant="small" className="font-medium">
                      Dashboard
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={logOut}
                    className="flex items-center gap-2 text-red-500"
                  >
                    <PowerIcon className="w-4 h-4" />
                    <Typography variant="small" className="font-medium">
                      Log Out
                    </Typography>
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          ) : (
            <div className="hidden gap-3 lg:flex">
              <Link to="/login">
                <Button variant="text" size="sm" color="blue">
                  LogIn
                </Button>
              </Link>
              <Link to="/signUp">
                <Button variant="gradient" color="blue-gray" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <XMarkIcon className="h-6 w-6" strokeWidth={2} /> : <Bars3Icon className="h-6 w-6" strokeWidth={2} />}
        </IconButton>
      </div>

      {/* Mobile Navigation */}
      <Collapse open={open} className="lg:hidden">
        <List className="my-4 p-0">
          {
            user ? (
              <div>
                <div className="flex items-center gap-4">
                  <Avatar src={user?.photoURL} alt="avatar" />
                  <div>
                    <Typography variant="h6">
                      {user?.displayName}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                      {user?.email}
                    </Typography>
                  </div>
                </div>
                <hr className='mt-3' />
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-4">
                  <Avatar src={userImg} alt="avatar" />
                  <div>
                    <Typography variant="h6">
                      Username
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                      user@gmail.com
                    </Typography>
                  </div>
                </div>
                <hr className='mt-3' />
              </div>
            )
          }
          {links}
          {
            user ? (
              <div className="w-full pb-4">
                <ListItem className="flex items-center gap-1 py-2 pr-4" onClick={() => navigate('/dashboard')}
                >
                  <IdentificationIcon className='w-5 h-5' />
                  <Typography variant="small" className="font-medium">
                    Dashboard
                  </Typography>
                </ListItem>
                <Button
                  onClick={logOut}
                  className="mt-4 flex items-center gap-2"
                  variant="text"
                  size="md"
                  color="red"
                >
                  <PowerIcon className="w-4 h-4" />
                  Log Out
                </Button>
              </div>
            ) : (
              <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden py-4">
                <Link to="/login" className="w-1/2">
                  <Button variant="outlined" size="sm" color="blue" fullWidth>
                    LogIn
                  </Button>
                </Link>
                <Link to="/signUp" className="w-1/2">
                  <Button variant="gradient" size="sm" color="gray" fullWidth>
                    Sign Up
                  </Button>
                </Link>
              </div>
            )
          }
        </List>
      </Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
