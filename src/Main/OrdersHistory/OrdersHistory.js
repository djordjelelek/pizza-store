import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, Paper, CircularProgress } from "@material-ui/core";
import { useAuth } from "../../AuthContext/AuthContext";

const useStyles = makeStyles((theme) => ({
  Container: {
    marginLeft: "auto",
    marginBottom: "42px",
  },
  Header: {
    marginTop: "7px",
    marginBottom: "-5px",
  },
  root: {
    flexGrow: 1,
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

const Orders = () => {
  const classes = useStyles();
  const [ordersList, setOrdersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const { userId } = useAuth();

  useEffect(() => {
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
          setOrdersList(Object.values(response.data));
          setLoading(false);
        });
    };
    getOrders();
  }, []);

  return loading ? (
    <div className={classes.SpinnerContainer}>
      <CircularProgress className={classes.Spinner} />
    </div>
  ) : ordersList.length > 0 ? (
    <Container className={classes.Container}>
      <h1 className={classes.Header}>ORDERS HISTORY</h1>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={4}>
            {ordersList.map((value, index) => (
              <Grid key={index} item>
                <Paper className={classes.paper}>
                  <h2
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Order
                  </h2>

                  {value.pizza.map((pizza, index) => (
                    <p>
                      {" "}
                      <i>{index + 1}.pizza</i>:{" "}
                      {pizza[0].map((ingr) => ingr + ", ")}
                      {pizza[1]}
                    </p>
                  ))}
                  <p style={{ textAlign: "center", marginTop: "0px" }}>
                    <strong>
                      <i>Final Price:</i>&nbsp;
                      {value.finalPrice} RSD
                    </strong>
                  </p>
                  <p>{value.time}</p>
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
        There is no order yet <br /> With every online order you gain 20% off
        <br />
        Make order{" "}
        <a href="/home" className={classes.Link}>
          now
        </a>
      </h1>
    </div>
  );
};

export default Orders;
