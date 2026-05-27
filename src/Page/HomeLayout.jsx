import { Outlet } from "react-router";
import Navber from "./Navber/Navber";
import Footer from "../Footer/Footer";

const HomeLayout = () => {
  return (
    <div>
      <Navber></Navber>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
