import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar/Sidebar";




const DashboardLayout = () => {


  return (
    <div className='min-h-screen md:flex text-gray-900 bg-white dark:bg-gray-900 dark:text-gray-100'>
      <Sidebar/>
      <div className='flex-1 md:ml-[302px]'>
        <div className='p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
