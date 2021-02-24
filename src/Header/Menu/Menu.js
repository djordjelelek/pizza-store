import React, { useState } from "react";
import classes from "./Menu.module.css";
import MenuItems from "./menuItems/MenuItems";
import SideDrawer from "./sideDrawer/SideDrawer";

const Menu = () => {
  const [showMobileMenu, setShowingMobileMenu] = useState(false);
  const mobile_menu = showMobileMenu ? (
    <SideDrawer setShowingMobileMenu={setShowingMobileMenu} />
  ) : null;

  return (
    <>
      {mobile_menu}
      <ul className={`${classes.Menu} ${classes.MenuItem}`}>
        <MenuItems />
      </ul>
    </>
  );
};
export default Menu;
