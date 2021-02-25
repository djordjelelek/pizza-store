import React, { useState, useEffect } from "react";
import axios from "axios";
import Pizza from "./Pizza/Pizza";
import BuildControls from "./BuildControls/BuildControls";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { useAuth } from "../../AuthContext/AuthContext";

const useStyles = makeStyles((theme) => ({
  Container: {
    flexGrow: 1,
    textAlign: "center",
    backgroundColor: "#ffffff00",
    padding: "20px",
    paddingTop: "50px",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    height: "unset",
    marginLeft: "-150px",

    "@media (max-width: 960px)": {
      display: "flex",
      flexDirection: "column",
      marginLeft: "0px",
    },
    "@media (max-width: 1100px)": {
      marginLeft: "0px",
    },
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
  const { logIn } = useAuth();
  const { token } = useAuth();
  const { userId } = useAuth();
  const { setCart } = useAuth();

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

  useEffect(() => {
    const getOrders = () => {
      if (logIn)
        axios
          .get(
            "https://pizza-app-rg-default-rtdb.firebaseio.com/carts.json" +
              "?auth=" +
              token +
              '&orderBy="userId"&equalTo="' +
              userId +
              '"'
          )
          .then((response) => {
            if (Object.values(response.data).length !== undefined) {
              setCart(() => Object.values(response.data).length);
              sessionStorage.setItem(
                "cart",
                Object.values(response.data).length
              );
            }
          });
    };
    getOrders();
  }, []);

  return (
    <Container className={classes.Container}>
      <Pizza ingredients={ingridientsTrue} />
      <BuildControls
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
    </Container>
  );
};

export default PizzaBuilder;
