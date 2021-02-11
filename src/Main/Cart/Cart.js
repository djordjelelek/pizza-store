import React, { useState, useEffect } from "react";
import classesCSS from "./Cart.module.css";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  CircularProgress,
  Paper,
  Button,
  Container,
} from "@material-ui/core";
import { useAuth } from "../../AuthContext/AuthContext";
import Reciept from "./Receipt/Receipt";

const useStyles = makeStyles((theme) => ({
  Container: {
    marginLeft: "auto",
  },
  root: {
    flexGrow: 1,
  },
  Header: {
    fontSize: "43px",
    marginTop: "-5px",
  },
  paper: {
    position: "relative",
    textAlign: "center",
    height: "310px",
    width: "370px",
    color: "#898989",
    paddingBottom: "2px",
  },
  control: {
    padding: theme.spacing(2),
  },
  MuiButton: {
    position: "absolute",
    marginLeft: "-40px",
    bootom: 0,
    backgroundColor: "red",
  },
}));

const Cart = () => {
  const classes = useStyles();
  const [ordersList, setOrdersList] = useState([]);
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openReceipt, setOpenReceipt] = React.useState(false);
  const { token } = useAuth();
  const { logIn } = useAuth();
  const { userId } = useAuth();

  const handleClickOpen = () => {
    setOpenReceipt(true);
  };

  const handleClose = () => {
    setOpenReceipt(false);
  };

  const deleteOrder = (value, index) => {
    // console.log(value);
    const ordersListCopy = [...ordersList];
    ordersListCopy.splice(index, 1);
    setOrdersList(ordersListCopy);
    axios.delete(
      "https://pizza-app-rg-default-rtdb.firebaseio.com/carts/" +
        keys[index] +
        ".json?auth=" +
        token
    );
    const keysCopy = [...keys];
    keysCopy.splice(index, 1);
    setKeys(keysCopy);
  };

  useEffect(() => {
    const getOrders = () => {
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
          setLoading(false);
          setOrdersList(Object.values(response.data));
          setKeys(Object.keys(response.data));
        });
    };
    getOrders();
  }, []);

  return logIn && ordersList.length > 0 ? (
    <>
      {loading ? (
        <div className={classes.SpinnerContainer}>
          <CircularProgress className={classes.Spinner} />
        </div>
      ) : (
        false
      )}
      <Container className={classes.Container}>
        {openReceipt ? (
          <Reciept
            openReceipt={openReceipt}
            handleClose={handleClose}
            ordersList={ordersList}
            keys={keys}
            setOrdersList={setOrdersList}
          />
        ) : null}
        <h1 className={classes.Header}>CART</h1>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={4}>
              {ordersList.map((value, index) => (
                <Grid key={index} item>
                  <Paper className={classes.paper}>
                    <h1>Pizza</h1>
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
                        total price:{" "}
                        {Math.round((value.price * 0.8 * 100) / 100).toFixed(2)}{" "}
                        RSD
                      </strong>
                    </p>
                    <p>{value.date}</p>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.MuiButton}
                      onClick={(event) => deleteOrder(value, index)}
                    >
                      Delete
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          className={classes.MuiButton2}
          onClick={handleClickOpen}
        >
          Buy
        </Button>
      </Container>
    </>
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

export default Cart;
