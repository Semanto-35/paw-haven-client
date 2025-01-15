import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer/Footer";


const MainLayout = () => {
  return (
    <div>
      <header>
        <h3 className="text-xl">nabbar</h3>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;