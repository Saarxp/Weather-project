import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import NavbarLo from "../../components/navbar/NavbarLo";
import { useContext, } from "react";
import { LoggedInContext } from "../../context/loggedInContext";


function NavbarWrapper() {

  const loggedIn = useContext(LoggedInContext);

  return (
    <>
        {loggedIn ? <Navbar /> : <NavbarLo />}
        <Outlet />
    </>
  );
}

export default NavbarWrapper;
