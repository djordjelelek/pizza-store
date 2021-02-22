import React, { useState } from "react";
import Pizza from "./Pizza/Pizza";
import BuildControls from "./BuildControls/BuildControls";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   paddingBottom: "10px",
  //   paddingTop: "10px",
  //   backgroundColor: "rgba(252, 252, 252, 0.274)",
  //   textAlign: "center",
  // },
  root: {
    flexGrow: 1,

    textAlign: "center",
    backgroundColor: "#ffffff00",
    // padding: "20px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paper1: {
    height: "450px",
    // width: "auto",
  },
  paper2: {
    // height: "auto",
    // width: "auto",
  },
  control: {
    padding: theme.spacing(2),
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
    ketchup: { price: 0, show: false },
    ham: { price: 70, show: false },
    mushrooms: { price: 40, show: false },
    meyo: { price: 0, show: false },
    chicken: { price: 70, show: false },
    beefSauce: { price: 50, show: false },
    bacon: { price: 60, show: false },
    onions: { price: 10, show: false },
    peppers: { price: 20, show: false },
    olives: { price: 20, show: false },
  });

  const ingridientsTrue = Object.keys(ingredients).filter(
    (el) => ingredients[el].show
  );

  return (
    <>
      <Container className={classes.root}>
        <Grid container spacing={1}>
          <Grid item lg={8}>
            <Pizza ingredients={ingridientsTrue} />
          </Grid>
          <Grid item lg={4}>
            <BuildControls
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PizzaBuilder;
