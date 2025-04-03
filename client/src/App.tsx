import { Outlet } from "react-router-dom";
import "./App.css";
import { Link } from "react-router-dom";
import Footer from "./components/display-and-tools/Footer";
import Header from "./components/display-and-tools/Header";
import ScrollToTop from "./components/display-and-tools/ScrollToTop";

function App() {
  return (
    <>
      <Link to="#main" className="skip-link">
        Skip to main content
      </Link>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
