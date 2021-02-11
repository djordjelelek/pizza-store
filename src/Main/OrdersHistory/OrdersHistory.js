import React, { useState, useEffect } from "react";
import classesCSS from "./OrdersHistory.module.css";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAuth } from "../../AuthContext/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: "auto",
    width: 370,
    color: "#898989",
    paddingTop: "0px",
    paddingBottom: "15px",
    // textAlign: "justify"
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
    marginTop: "312px",
    color: "#4caf50",
  },
}));

const Orders = () => {
  const classes = useStyles();
  const [ordersList, setOrdersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const { logIn } = useAuth();
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
    <div className={classesCSS.Orders}>
      <h1 className={classesCSS.Header}>ORDERS HISTORY</h1>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={4}>
            {ordersList.map((value, index) => (
              <Grid key={index} item>
                <Paper className={classes.paper}>
                  <h1>Order</h1>
                  <ol>
                    {value.pizza.map((pizza, index) => (
                      <li key={index}>
                        <strong>pizza</strong>:
                        {pizza[0].map((ingr) => ingr + ", ")}
                        {pizza[1]}
                        <br />
                      </li>
                    ))}
                  </ol>
                  {/* <p>
                    <strong>price</strong>: {value.price} RSD
                  </p> */}
                  <p>
                    <strong>
                      total price:&nbsp;
                      {value.finalPrice} RSD
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
  ) : (
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
  );
};

export default Orders;
