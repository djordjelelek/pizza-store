import React from "react";
import classes from "./Header.module.css";
import Logo from "./Logo/Logo";
import Menu from "./Menu/Menu";

const Header = () => {
  return (
    <div className={classes.Header}>
      <Logo />
      <Menu />
    </div>
  );
};
export default Header;
