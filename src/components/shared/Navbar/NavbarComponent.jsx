import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Button, Menu, MenuHandler, MenuList, MenuItem, Avatar, Typography, IconButton, Collapse, } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, } from "@heroicons/react/24/outline";
import { HomeIcon, WalletIcon, PowerIcon, Squares2X2Icon, IdentificationIcon, } from "@heroicons/react/24/solid";
import userImg from '../../../assets/icons/user.jpg';
import useAuth from "../../../hooks/useAuth";
import DarkModeToggle from "../DarkMode/DarkModeToggle";
import Swal from "sweetalert2";



const NavbarComponent = () => {
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpen(false);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navList = (
    <ul className="my-2 flex flex-col gap-2 lg:my-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="small" className="p-1 font-normal">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 ${isActive && "text-pink-500 font-semibold"} hover:text-pink-500`
          }
        >
          <HomeIcon className="w-4 h-4 pb-[1px]" />
          <span>Home</span>
        </NavLink>
      </Typography>

      <Typography as="li" variant="small" className="p-1 font-normal">
        <NavLink
          to="/pets"
          className={({ isActive }) =>
            `flex items-center gap-2 ${isActive && "text-pink-500 font-semibold"} hover:text-pink-500`
          }
        >
          <Squares2X2Icon className="w-4 h-4" />
          <span>Pet Listing</span>
        </NavLink>
      </Typography>

      <Typography as="li" variant="small" className="p-1 font-normal">
        <NavLink
          to="/donations"
          className={({ isActive }) =>
            `flex items-center gap-2 ${isActive && "text-pink-500 font-semibold"} hover:text-pink-500`
          }
        >
          <WalletIcon className='w-4 h-4' />
          <span>Donation Campaigns</span>
        </NavLink>
      </Typography>
    </ul>
  );

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
      }
    });
  };


  return (
    <Navbar fullWidth className="fixed top-0 left-0 z-50 bg-white dark:bg-black text-black dark:text-white border-none shadow-none p-0">
      <div className="flex items-center justify-between  max-w-screen-2xl mx-auto py-3 px-4 shadow-sm">
        {/* Logo */}
        <Link to="/">
          <Typography
            variant="h4"
            className="flex items-center gap-3"
          >
            <img className="w-12" src="https://i.ibb.co.com/69vhxMW/paw-1.png" alt="Logo" />
            Paw Haven
          </Typography>
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:block">
          {navList}
        </div>

        <div className="flex items-center gap-3">
          <DarkModeToggle />

          {/* User Menu / auth buttons */}
          {user ? (
            <div className="hidden lg:block">
              <Menu placement="bottom-end">
                <MenuHandler>
                  <Avatar
                    variant="circular"
                    size="md"
                    alt="User"
                    withBorder
                    className="p-0.5"
                    src={user?.photoURL}
                  />
                </MenuHandler>
                <MenuList className="p-1 dark:bg-black bg-white text-black dark:text-white">
                  <div className="px-4 py-2">
                    <Typography variant="h6">
                      {user?.displayName}
                    </Typography>
                    <Typography variant="small">
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
                    onClick={handleLogout}
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
                <Button variant="text" size="sm" color="pink">
                  LogIn
                </Button>
              </Link>
              <Link to="/signUp">
                <Button variant="filled" color="pink" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <IconButton
            variant="text"
            className="lg:hidden text-black dark:text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <XMarkIcon className="h-6 w-6" strokeWidth={2} /> : <Bars3Icon className="h-6 w-6" strokeWidth={2} />}
          </IconButton>
        </div>
      </div>

      {/* Mobile Navigation */}
      <Collapse open={open} className="px-4 lg:hidden">
        {
          user ? (
            <div>
              <div className="flex items-center gap-4 mt-2">
                <Avatar src={user?.photoURL} alt="avatar" />
                <div>
                  <Typography variant="h6">
                    {user?.displayName}
                  </Typography>
                  <Typography variant="small" className="font-normal">
                    {user?.email}
                  </Typography>
                </div>
              </div>
              <hr className='my-3' />
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-4 mt-2">
                <Avatar src={userImg} alt="avatar" />
                <div>
                  <Typography variant="h6">
                    Username
                  </Typography>
                  <Typography variant="small" className="font-normal">
                    user@gmail.com
                  </Typography>
                </div>
              </div>
              <hr className='my-3' />
            </div>
          )
        }
        {navList}
        {
          user ? (
            <div className="w-full pb-4">
              <Typography as="li" variant="small" className="p-1">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 hover:text-pink-500"
                >
                  <IdentificationIcon className='w-4 h-4' />
                  <span>Dashboard</span>
                </Link>
              </Typography>
              <Button
                onClick={handleLogout}
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
                <Button variant="outlined" size="sm" color="pink" fullWidth>
                  LogIn
                </Button>
              </Link>
              <Link to="/signUp" className="w-1/2">
                <Button variant="filled" size="sm" color="pink" fullWidth>
                  Sign Up
                </Button>
              </Link>
            </div>
          )
        }
      </Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
