import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer/Footer";
import NavbarComponent from "../components/shared/Navbar/NavbarComponent";




const MainLayout = () => {
  return (
    <div>
      <header>
        <NavbarComponent />
      </header>
      <main className="min-h-[calc(100vh-353px)]">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;