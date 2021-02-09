import React, { useState } from "react";
import Pizza from "./Pizza/Pizza";
import BuildControls from "./BuildControls/BuildControls";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   paddingBottom: "10px",
  //   paddingTop: "10px",
  //   backgroundColor: "rgba(252, 252, 252, 0.274)",
  //   textAlign: "center",
  // },
  root: {
    flexGrow: 1,
    // textAlign: "center",
    backgroundColor: "blue",
    padding: "20px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paper1: {
    height: "auto",
    width: "auto",
  },
  paper2: {
    height: "auto",
    width: "auto",
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const PizzaBuilder = () => {
  const classes = useStyles();
  const [ingredients, setIngredients] = useState({
    ketchup: { price: 1, show: false },
    ham: { price: 1, show: false },
    mushrooms: { price: 1, show: false },
    meyo: { price: 1, show: false },
    chicken: { price: 60, show: false },
    beefSauce: { price: 30, show: false },
    bacon: { price: 40, show: false },
    onions: { price: 10, show: false },
    peppers: { price: 10, show: false },
    olives: { price: 20, show: false },
  });

  const ingridientsTrue = Object.keys(ingredients).filter(
    (el) => ingredients[el].show
  );

  return (
    <Container className={classes.root}>
      <Grid container spacing={1}>
        <Grid item lg={8}>
          <Paper className={classes.paper1}>
            <Pizza ingredients={ingridientsTrue} />
          </Paper>
        </Grid>
        <Grid item lg={4}>
          <Paper className={classes.paper2}>
            <BuildControls
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PizzaBuilder;
