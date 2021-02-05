import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import classes from "./Main.module.css";
import PizzaBuilder from "./PizzaBuilder/PizzaBuilder";
import Orders from "./Orders/Orders";
import SignUp from "./Authentification/SignUp/SignUp";
import LogIn from "./Authentification/LogIn/LogIn";
import ResetPassword from "./Authentification/ResetPassword/ResetPassword";
import { useAuth } from "../AuthContext/AuthContext";

function Main() {
  const { logIn } = useAuth();
  return (
    <div className={classes.Main}>
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
    </div>
  );
}

export default Main;
