import React, { useState } from "react";
import { useAuth } from "../../AuthContext/AuthContext";
import menu from "./menu-mobile.svg.png";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
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
  const [loading, setLoading] = useState(false);
  const { logIn } = useAuth();
  const { setLogIn } = useAuth();
  const { setToken } = useAuth();
  const { setUserId } = useAuth();
  const { cart } = useAuth();

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
      <List className={classes.ListItem}>
        {[
          <NavLink to="/home" activeStyle={{ color: "orange" }}>
            Pizza Builder
          </NavLink>,
          <NavLink to="/orders-history" activeStyle={{ color: "orange" }}>
            Orders History
          </NavLink>,
          <NavLink to="/cart" activeStyle={{ color: "orange" }}>
            Cart
          </NavLink>,
        ].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          <NavLink to="/login" activeStyle={{ color: "orange" }}>
            Log In
          </NavLink>,
          <NavLink
            to="/login"
            activeStyle={{ color: "orange" }}
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLogIn(false);
                setToken("");
                setUserId("");
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("userId");
                sessionStorage.removeItem("cart");
                window.location.reload();
              }, 500);
            }}
          >
            Log Out
          </NavLink>,
        ].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
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
