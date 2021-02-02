import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import classes from "./Main.module.css";
import PizzaBuilder from "./PizzaBuilder/PizzaBuilder";
import Orders from "./Orders/Orders";
import SignUp from "./Authentification/SignUp/SignUp";
import LogIn from "./Authentification/LogIn/LogIn";

function Main() {
  return (
    <div className={classes.Main}>
      <Switch>
        <Route path="/home" exact component={PizzaBuilder} />
        <Redirect from="/" exact to="/home" />
        <Route path="/orders" component={Orders} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
      </Switch>
    </div>
  );
}

export default Main;
