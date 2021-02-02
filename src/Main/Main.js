import React from "react";
import SignUp from "./Authentification/SignUp/SignUp";
import LogIn from "./Authentification/LogIn/LogIn";
import { Switch, Route } from "react-router-dom";
import classes from "./Main.module.css";

function Main() {
  return (
    <div className={classes.Main}>
      <Switch>
        {/* <Route path="/home" exact component={HomePage} />
        <Redirect from="/" exact to="/home" /> */}
        <Route path="/signup" component={SignUp} />
        <Route path="/" component={LogIn} />
      </Switch>
    </div>
  );
}

export default Main;
