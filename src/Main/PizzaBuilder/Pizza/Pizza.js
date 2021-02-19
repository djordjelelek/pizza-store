import React from "react";
import classes from "./Pizza.module.css";
import PizzaIngridiants from "./PizzaIngridiants/PizzaIngridiants";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // textAlign: "center",
    backgroundColor: "rgba(115, 41, 18, 0.4)",
    margin: "auto",
    textAlign: "center",
    // marginBottom: "-5px",
    // marginBottom: "0px",
    // paddingTop: "20px",
    // paddingBottom: "0px",
  },
}));

const Pizza = (props) => {
  const classess = useStyles();
  return (
    <Container className={classess.root}>
      <div className={classes.pizza}>
        {props.ingredients.map((ingrident, index) => {
          return <PizzaIngridiants type={ingrident} key={index} />;
        })}
      </div>
    </Container>
  );
};

export default Pizza;
