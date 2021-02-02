import React from "react";
import SignUp from "./Authentification/SignUp/SignUp";
import LogIn from "./Authentification/LogIn/LogIn";
import { Switch, Route, Redirect } from "react-router-dom";
import classes from "./Main.module.css";

function Main() {
  return (
    <div className={classes.Main}>
      <Switch>
        <Route path="/home" exact component={LogIn} />
        <Redirect from="/" exact to="/home" />
        <Route path="/orders" component={LogIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
      </Switch>
    </div>
  );
}

export default Main;
