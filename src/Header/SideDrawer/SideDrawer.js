import React, { useState } from "react";
import { useAuth } from "../../AuthContext/AuthContext";
import menu from "./menu-mobile.svg.png";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import CircularProgress from "@material-ui/core/CircularProgress";
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
        <ListItem button>
          <NavLink
            to="/home"
            activeStyle={{ color: "orange" }}
            style={{ textDecoration: "none", color: "black" }}
          >
            Pizza Builder
          </NavLink>
        </ListItem>
        {logIn ? (
          <ListItem button>
            <NavLink to="/orders-history" activeStyle={{ color: "orange" }}>
              Orders History
            </NavLink>
          </ListItem>
        ) : null}
        <ListItem button>
          <NavLink
            to="/cart"
            activeStyle={{ color: "orange" }}
            style={{ textDecoration: "none", color: "black" }}
          >
            Cart
          </NavLink>
        </ListItem>
      </List>
      <Divider />
      <List className={classes.ListItem}>
        {!logIn ? (
          <ListItem button>
            <NavLink
              to="/login"
              activeStyle={{ color: "orange" }}
              style={{ textDecoration: "none", color: "black" }}
            >
              Log In
            </NavLink>
          </ListItem>
        ) : (
          <ListItem button>
            <NavLink
              to="/login"
              activeStyle={{ color: "orange" }}
              style={{ textDecoration: "none", color: "black" }}
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
            </NavLink>
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <>
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
      {loading ? (
        <div className={classes.SpinnerContainer}>
          <CircularProgress className={classes.Spinner} />
        </div>
      ) : null}
    </>
  );
}
