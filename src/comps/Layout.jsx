import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import FormToSubcribe from "./FormToSubcribe";
import Header from "./Header";
import NavBar from "./NavBar";

function Layout({ children }) {
  const location = useLocation();
  return (
    <div className="max-w-[1000px] mx-auto">
      <NavBar />
      {location.pathname !== "/register" && <Header />}
      {children}
      <FormToSubcribe />
      <Footer />
    </div>
  );
}

export default Layout;
