import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PizzaBuilder from "./PizzaBuilder/PizzaBuilder";
import Orders from "./Orders/Orders";
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
    <Container component="main" maxWidth="md" className={classes.root}>
      <Switch>
        <Route path="/home" exact component={PizzaBuilder} />
        <Redirect from="/" exact to="/home" />
        <Route path="/orders" component={Orders} />
        {logIn ? (
          <>
            <Redirect from="/signup" to="/home" />
            <Redirect from="/login" to="/home" />
            <Redirect from="/reset-password" to="/home" />
          </>
        ) : (
          <>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <Route path="/reset-password" component={ResetPassword} />
          </>
        )}
      </Switch>
    </Container>
  );
};

export default Main;
