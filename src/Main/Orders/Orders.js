import React, { useState, useEffect } from "react";
import classesCSS from "./Orders.module.css";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useAuth } from "../../AuthContext/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 250,
    width: 400,
    color: "#898989",
    paddingTop: "0px",
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const Orders = () => {
  const classes = useStyles();
  const [ordersList, setOrdersList] = useState([]);
  const { token } = useAuth();
  const { logIn } = useAuth();
  const { userId } = useAuth();

  const getOrders = () => {
    axios
      .get(
        "https://pizza-app-rg-default-rtdb.firebaseio.com/orders.json" +
          "?auth=" +
          token +
          '&orderBy="userId"&equalTo="' +
          userId +
          '"'
      )
      .then((response) => {
        console.log(Object.values(response.data));
        setOrdersList(Object.values(response.data));
      });
  };
  useEffect(() => {
    getOrders();
  });

  return logIn && ordersList.length > 0 ? (
    <div className={classesCSS.Orders}>
      <h1 className={classesCSS.Header}>ORDERS</h1>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={4}>
            {ordersList.map((value) => (
              <Grid key={value} item>
                <Paper className={classes.paper}>
                  <h1>Order</h1>
                  <p>
                    <strong>ingridents</strong>:
                    {value.recipe.map((ingr) => ingr + ", ")}
                  </p>
                  <p>
                    <strong>price</strong>: {value.price} RSD
                  </p>
                  <p>
                    <strong>discount</strong>: 20%
                  </p>
                  <p>
                    <strong>
                      total price: {Math.round(value.price * 0.8 * 100) / 100}{" "}
                      RSD
                    </strong>
                  </p>
                  <p>{value.date}</p>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  ) : logIn ? (
    <div>
      <h1 className={classesCSS.NoOrders}>
        There is no order yet <br /> With every online order you gain 20% off
        <br />
        Make order{" "}
        <a href="/home" className={classesCSS.Link}>
          now
        </a>
      </h1>
    </div>
  ) : (
    <div>
      <h1 className={classesCSS.NoOrders}>
        You are not signed in
        <br /> Please{" "}
        <a href="/login" className={classesCSS.Link}>
          LogIn
        </a>{" "}
        or{" "}
        <a href="/signup" className={classesCSS.Link}>
          SignUp
        </a>{" "}
        for 20% discount on each order
      </h1>
    </div>
  );
};

export default Orders;
