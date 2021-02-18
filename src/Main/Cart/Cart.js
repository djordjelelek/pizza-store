import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  CircularProgress,
  Paper,
  Button,
  Container,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useAuth } from "../../AuthContext/AuthContext";
import Reciept from "./Receipt/Receipt";

const useStyles = makeStyles((theme) => ({
  Container: {
    marginLeft: "auto",
    marginBottom: "42px",
  },
  root: {
    flexGrow: 1,
  },
  Header: {
    marginTop: "7px",
    marginBottom: "14px",
  },
  paper: {
    backgroundColor: "rgba(255, 211, 128, 0.4)",
    position: "relative",
    textAlign: "left",
    margin: "5px",
    marginBottom: "-7px",
    height: "auto",
    width: "370px",
    color: "darkslategray",
    paddingBottom: "0.1px",
    paddingLeft: "17px",
    paddingRight: "17px",
    paddingTop: "0px",
    boxShadow: "4px 4px 15px  grey",
    borderRadius: "6px",
  },
  control: {
    padding: theme.spacing(2),
  },
  MuiButton2: {
    backgroundColor: "#8fcc66",
    "&:hover": {
      backgroundColor: "#74a653",
    },
    marginBottom: "8px",
  },
  NoOrders: {
    color: "rgb(255, 255, 255)",
    padding: "70px",
  },
  Link: {
    textDecoration: "none",
    color: "rgb(73, 134, 231)",
  },
  SpinnerContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    right: 0,
    bottom: 0,
    backdropFilter: "blur(2px)",
    zIndex: 1,
  },
  Spinner: {
    marginTop: "200px",
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
          // setLoading(false);
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
        <Button
          variant="contained"
          color="primary"
          className={classes.MuiButton2}
          onClick={handleClickOpen}
        >
          Proceed to checkout
        </Button>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={4}>
              {ordersList.map((value, index) => (
                <Grid key={index} item>
                  <Paper className={classes.paper}>
                    <h1
                      style={{
                        textAlign: "end",
                      }}
                    >
                      <IconButton
                        size="small"
                        aria-label="close"
                        color="primary"
                        style={{
                          marginTop: "-15px",
                          marginRight: "-15px",
                        }}
                        onClick={() => deleteOrder(value, index)}
                      >
                        <CloseIcon
                          fontSize="small"
                          style={{
                            color: "red",
                          }}
                        />
                      </IconButton>
                    </h1>
                    <h2
                      style={{
                        textAlign: "center",
                        marginTop: "-50px",
                        marginBottom: "-10px",
                      }}
                    >
                      Pizza
                    </h2>
                    <p>
                      <i>Ingredients</i>:{" "}
                      {value.recipe.map((ingr) => {
                        if (
                          ingr === value.recipe[value.recipe.length - 1] &&
                          ingr === "beefSauce"
                        )
                          return "beef sauce";
                        if (ingr === value.recipe[value.recipe.length - 1])
                          return ingr;
                        if (ingr === "beefSauce") ingr = "beef sauce";
                        return ingr + ", ";
                      })}
                    </p>
                    <p>
                      <i>Time</i>: {value.time}
                    </p>
                    <p>
                      <i>Price</i>: {value.price}.00 RSD, <i>Discount</i>: 20%
                    </p>
                    <p style={{ textAlign: "center", marginTop: "-20px" }}>
                      <strong>
                        <br />
                        <i>Final Price</i>:{" "}
                        {Math.round((value.price * 0.8 * 100) / 100).toFixed(2)}{" "}
                        RSD
                      </strong>
                    </p>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    ) : (
      <div>
        <h1 className={classes.NoOrders}>
          The cart is empty <br /> With every online order you gain 20% off
          <br />
          Make an order{" "}
          <a href="/home" className={classes.Link}>
            now
          </a>
        </h1>
      </div>
    )
  ) : (
    <div>
      <h1 className={classes.NoOrders}>
        You are not logged in
        <br /> Please{" "}
        <a href="/login" className={classes.Link}>
          Log In
        </a>{" "}
        or{" "}
        <a href="/signup" className={classes.Link}>
          Sign Up&nbsp;
        </a>
        for <br />
        20% discount
      </h1>
    </div>
  );
};

export default Cart;
