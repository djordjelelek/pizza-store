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
    backgroundColor: "rgba(255, 219, 128, 0.6)",
    position: "relative",
    textAlign: "left",
    margin: "5px",
    marginBottom: "-12px",
    height: "auto",
    width: "370px",
    color: "darkslategray",
    paddingBottom: "2px",
    paddingLeft: "10px",
    paddingTop: "0px",
    boxShadow: "4px 4px 15px  grey",
    borderRadius: "6px",
  },
  control: {
    padding: theme.spacing(2),
  },
  MuiButton: {
    // position: "absolute",
    textAlign: "center",
    bootom: 0,
    backgroundColor: "red",
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
    marginTop: "312px",
    color: "#4caf50",
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
          setOrdersList(Object.values(response.data));
          setKeys(Object.keys(response.data));
          setLoading(false);
        });
    };
    getOrders();
  }, []);

  return logIn ? (
    loading ? (
      <div className={classes.SpinnerContainer}>
        <CircularProgress className={classes.Spinner} />
      </div>
    ) : ordersList.length > 0 ? (
      <Container className={classes.Container}>
        {openReceipt ? (
          <Reciept
            openReceipt={openReceipt}
            handleClose={handleClose}
            ordersList={ordersList}
            keys={keys}
            setOrdersList={setOrdersList}
            setLoading={setLoading}
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
                      Ingredients: {value.recipe.map((ingr) => ingr + ", ")}
                    </p>
                    <p>{value.date}</p>
                    <p>Price: {value.price}.00 RSD, Discount: 20%</p>
                    <p>
                      <strong>
                        <br />
                        Final Price:{" "}
                        {Math.round((value.price * 0.8 * 100) / 100).toFixed(
                          2
                        )}{" "}
                        RSD
                      </strong>
                    </p>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.MuiButton}
                      onClick={(event) => deleteOrder(value, index)}
                    >
                      Remove
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
    ) : (
      <div>
        <h1 className={classesCSS.NoOrders}>
          The cart is empty <br /> With every online order you gain 20% off
          <br />
          Make order
          <a href="/home" className={classesCSS.Link}>
            now
          </a>
        </h1>
      </div>
    )
  ) : (
    <div>
      <h1 className={classesCSS.NoOrders}>
        You are not logged in
        <br /> Please{" "}
        <a href="/login" className={classesCSS.Link}>
          Log In
        </a>{" "}
        or{" "}
        <a href="/signup" className={classesCSS.Link}>
          Sign Up&nbsp;
        </a>
        for <br />
        20% discount
      </h1>
    </div>
  );
};

export default Cart;
