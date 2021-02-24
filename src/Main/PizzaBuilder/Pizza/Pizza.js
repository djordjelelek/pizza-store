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
    padding: "30px",
    maxWidth: "570px",

    "@media (max-width: 960px)": {
      marginLeft: "0px",
    },
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
