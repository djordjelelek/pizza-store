import React from "react";
import SignUp from "./Authentification/SignUp";
import { Switch, Route } from "react-router-dom";
import classes from "./Main.module.css";

function Main() {
  return (
    <div className={classes.Main}>
      <Switch>
        {/* <Route path="/home" exact component={HomePage} />
        <Redirect from="/" exact to="/home" /> */}
        <Route path="/" component={SignUp} />
      </Switch>
    </div>
  );
}

export default Main;
