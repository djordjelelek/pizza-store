import React, { Component } from "react";
import classes from "./Header.module.css";
import Logo from "../../components/Navigation/Logo/Logo";
import Menu from "../../components/Navigation/Menu/Menu";
import MenuMobile from "../../components/Navigation/MobileMenu/MobileMenu";

class Header extends Component {
  state = {
    showMenu: true,
  };
  changeMenuHandler = () => {
    this.setState((state) => {
      return { showMenu: !state.showMenu };
    });
  };

  render() {
    return (
      <div className={classes.Header}>
        <Logo />
        <Menu />
        <MenuMobile
          showMenu={this.state.showMenu}
          changeMenuStatus={this.changeMenuHandler}
        />
      </div>
    );
  }
}

export default Header;
