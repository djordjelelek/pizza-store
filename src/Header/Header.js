import React from "react";
import classes from "./Header.module.css";
import Logo from "./Logo/Logo";
import Menu from "./Menu/Menu";
import SideDrawer from "./SideDrawer/SideDrawer";

const Header = () => {
  return (
    <>
      <div className={classes.Header}>
        <Logo />
        <Menu />
        <SideDrawer />
      </div>
    </>
  );
};
export default Header;
