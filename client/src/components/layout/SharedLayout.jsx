import { Outlet } from "react-router";
import Navbar from "./Navbar";

const SharedLayout = () => {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
};

export default SharedLayout;
