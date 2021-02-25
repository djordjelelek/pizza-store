import React from "react";
import menu from "./menu-mobile.svg.png";
import Menu from "../Menu/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  list: {
    width: 250,
    backgroundColor: "orange",
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
    Container: {
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
      <Menu />
      <Divider />
    </div>
  );

  return (
    <div className={classes.Container}>
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
