import Navbar from "../components/navbar/navbar";
import { Outlet } from "react-router-dom";
import "./layout.css";

function Layout() {
  return (
    <>
      <Navbar></Navbar>
      <div className="main">
      <Outlet></Outlet>
      </div>
    </>
  );
}

export default Layout;
