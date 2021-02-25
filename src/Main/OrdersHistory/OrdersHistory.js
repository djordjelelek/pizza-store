import React, { useState, useEffect } from "react";
import axios from "axios";
import useStyles from "./OrdersHistoryUseStyles";
import {
  Grid,
  Container,
  Paper,
  CircularProgress,
  ListItem,
  List,
  ListItemText,
} from "@material-ui/core";
import { useAuth } from "../../AuthContext/AuthContext";

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
                      paddingTop: "8px",
                      marginBottom: "0px",
                    }}
                  >
                    Order
                  </h2>
                  <List className={classes.List}>
                    {value.pizza.map((pizza, index) => (
                      <ListItem key={index} style={{ marginBottom: "-15px" }}>
                        <ListItemText className={classes.Ingridients}>
                          <i>Pizza {index + 1}</i>:{" "}
                          {pizza[0].map((ingr) => {
                            if (
                              ingr === pizza[0][pizza[0].length - 1] &&
                              ingr === "beefSauce"
                            )
                              return "beef sauce";
                            if (ingr === pizza[0][pizza[0].length - 1])
                              return ingr;
                            if (ingr === "beefSauce") ingr = "beef sauce";
                            return ingr + ", ";
                          })}
                        </ListItemText>
                        <ListItemText className={classes.Prices}>
                          {pizza[1]} RSD
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                  <List
                    style={{
                      width: "100%",
                      paddingBottom: "0px",
                    }}
                  >
                    <ListItem>
                      <ListItemText>
                        <i>Time: </i>
                        {value.time}
                      </ListItemText>
                      <ListItemText></ListItemText>
                      <ListItemText style={{ textAlign: "end" }}>
                        <strong>
                          <i>Final price: </i>
                          {value.finalPrice} RSD
                        </strong>
                      </ListItemText>
                    </ListItem>
                  </List>
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
        There are no orders yet <br /> With every online order you gain 20% off
        <br />
        Make an order{" "}
        <a href="/home" className={classes.Link}>
          now
        </a>
      </h1>
    </div>
  );
};

export default Orders;
