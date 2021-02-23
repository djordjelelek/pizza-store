import React, { useState } from "react";
import Pizza from "./Pizza/Pizza";
import BuildControls from "./BuildControls/BuildControls";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  Container: {
    flexGrow: 1,
    textAlign: "center",
    backgroundColor: "#ffffff00",
    padding: "10px",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    height: "unset",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  SpinnerContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backdropFilter: "blur(2px)",
    zIndex: 1,
  },
  Spinner: {
    marginTop: "180px",
    color: "#4caf50",
  },
}));

const PizzaBuilder = () => {
  const classes = useStyles();
  const [ingredients, setIngredients] = useState({
    ham: { price: 70, show: false },
    mushrooms: { price: 40, show: false },
    chicken: { price: 70, show: false },
    bacon: { price: 60, show: false },
    beefSauce: { price: 50, show: false },
    onions: { price: 10, show: false },
    peppers: { price: 20, show: false },
    olives: { price: 20, show: false },
    ketchup: { price: 0, show: false },
    meyo: { price: 0, show: false },
  });

  const ingridientsTrue = Object.keys(ingredients).filter(
    (el) => ingredients[el].show
  );

  return (
    <>
      <Container className={classes.Container}>
        <Pizza ingredients={ingridientsTrue} />
        <BuildControls
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
      </Container>
    </>
  );
};

export default PizzaBuilder;
