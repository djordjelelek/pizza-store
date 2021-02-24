import React from "react";
import menu from "./menu-mobile.svg.png";
import MenuItems from "../menuItems/MenuItems";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  MenuIcon: {
    width: "3.1em",
    marginRight: "-5px",
    marginTop: "5px",
  },
  "@media (min-width: 501px)": {
    MenuIcon: {
      display: "none",
    },
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [drawer, setDrawer] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    setDrawer(open);
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <MenuItems />
      <Divider />
    </div>
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <img
          src={menu}
          alt="mobile-menu"
          className={classes.MenuIcon}
          onClick={toggleDrawer(true)}
        />
        <Drawer open={drawer} anchor={"right"} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
