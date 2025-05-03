import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer/Footer";
import NavbarComponent from "../components/shared/Navbar/NavbarComponent";




const MainLayout = () => {
  return (
    <div>
      <header>
        <NavbarComponent />
      </header>
      <main className="min-h-[calc(100vh-487px)] bg-blue-gray-50 dark:bg-blue-gray-900 text-blue-gray-800 dark:text-blue-gray-100">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;