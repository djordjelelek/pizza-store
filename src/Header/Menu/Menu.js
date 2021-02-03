import React, { useState } from "react";
import classes from "./Menu.module.css";
import menu from "./menu-mobile.svg.png";
import MenuItems from "./menuItems/MenuItems";

const Menu = () => {
  const [showMobileMenu, setShowingMobileMenu] = useState(false);
  const mobile_menu = showMobileMenu ? (
    <ul className={`${classes.List} ${classes.MobileMenu}`}>
      <MenuItems />
    </ul>
  ) : null;

  return (
    <>
      <img
        src={menu}
        alt="mobile-menu"
        className={classes.MenuIcon}
        onClick={() => setShowingMobileMenu((previousState) => !previousState)}
      />
      {mobile_menu}
      <ul className={`${classes.Menu} ${classes.MenuItem}`}>
        <MenuItems />
      </ul>
    </>
  );
};
export default Menu;
