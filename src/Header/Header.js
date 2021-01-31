import React, { useState } from "react";
import classes from "./Header.module.css";
import Logo from "./Navigation/Logo/Logo";
import Menu from "./Navigation/Menu/Menu";
import MenuMobile from "./Navigation/MobileMenu/MobileMenu";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const changeMenuHandler = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={classes.Header}>
      <Logo />
      <Menu />
      <MenuMobile showMenu={showMenu} changeMenuStatus={changeMenuHandler} />
    </div>
  );
};

export default Header;
