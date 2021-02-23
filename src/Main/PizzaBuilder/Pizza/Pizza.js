import React from "react";
import classes from "./Pizza.module.css";
import PizzaIngridiants from "./PizzaIngridiants/PizzaIngridiants";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Container: {
    backgroundColor: "rgba(115, 41, 18, 0.4)",
    boxShadow: "4px 4px 15px  grey",
    borderRadius: "6px",
    margin: "auto",
    textAlign: "end",
    right: 0,
    position: "relative",
    paddingTop: "30px",
    paddingBottom: "30px",
  },
}));

const Pizza = (props) => {
  const classess = useStyles();
  return (
    <Container className={classess.Container}>
      <div className={classes.pizza}>
        {props.ingredients.map((ingrident, index) => {
          return <PizzaIngridiants type={ingrident} key={index} />;
        })}
      </div>
    </Container>
  );
};

export default Pizza;
