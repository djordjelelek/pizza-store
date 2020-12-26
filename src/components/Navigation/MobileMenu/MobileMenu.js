import React from "react";
import classes from "./MobileMenu.module.css";
import MenuIcon from "./menu.png";

const mobileMenu = (props) => {
  const showMenu = props.showMenu ? (
    <div className={classes.MobileMenu}>
      <ul className={classes.List}>
        <li link="/">
          <a href="/">Pizza Builder</a>
        </li>
        <li link="/">
          <a href="/">Checkout</a>
        </li>
      </ul>
    </div>
  ) : null;
  return (
    <>
      <img
        src={MenuIcon}
        alt="menu-icon"
        className={classes.MenuIcon}
        onClick={() => props.changeMenuStatus()}
      />
      {showMenu}
    </>
  );
};
export default mobileMenu;
