import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar/Sidebar";




const DashboardLayout = () => {


  return (
    <div className='min-h-screen md:flex text-blue-gray-800 bg-blue-gray-50 dark:bg-blue-gray-900 dark:text-blue-gray-100'>
      <Sidebar />
      <div className='flex-1 md:ml-[302px]'>
        <div className='p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
