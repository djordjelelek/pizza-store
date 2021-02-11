import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PizzaBuilder from "./PizzaBuilder/PizzaBuilder";
import Cart from "./Cart/Cart";
import OrdersHistory from "./OrdersHistory/OrdersHistory";
import SignUp from "./Authentification/SignUp/SignUp";
import LogIn from "./Authentification/LogIn/LogIn";
import ResetPassword from "./Authentification/ResetPassword/ResetPassword";
import { useAuth } from "../AuthContext/AuthContext";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: "10px",
    paddingTop: "10px",
  },
}));
const Main = () => {
  const { logIn } = useAuth();
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="lg" className={classes.root}>
      {logIn ? (
        <Switch>
          <Route path="/home" component={PizzaBuilder} />
          <Route path="/cart" component={Cart} />
          <Route path="/orders-history" component={OrdersHistory} />
          <Redirect from="/" exact to="/home" />
          <Redirect from="/signup" to="/home" />
          <Redirect from="/login" to="/home" />
          <Redirect from="/reset-password" to="/home" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/login" component={LogIn} />
          <Redirect from="/" exact to="/login" />
          <Redirect from="/home" to="/login" />
          <Redirect from="/cart" to="/login" />
          <Redirect from="/orders-history" to="/login" />
        </Switch>
      )}
    </Container>
  );
};

export default Main;
