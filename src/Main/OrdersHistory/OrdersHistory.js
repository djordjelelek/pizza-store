import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
  Container: {
    marginLeft: "auto",
    marginBottom: "42px",
  },
  Header: {
    marginTop: "22px",
    marginBottom: "12px",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    backgroundColor: "rgba(128, 211, 255, 0.4)",
    position: "relative",
    textAlign: "left",
    margin: "5px",
    marginBottom: "-7px",
    height: "auto",
    width: "430px",
    color: "darkslategray",
    paddingBottom: "0px",
    paddingLeft: "0px",
    paddingRight: "0px",
    paddingTop: "0px",
    boxShadow: "4px 4px 15px  grey",
    borderRadius: "6px",
  },
  control: {
    padding: theme.spacing(2),
  },
  Ingridients: {
    maxWidth: "70%",
  },
  List: {
    width: "100%",
  },
  Prices: {
    top: 0,
    textAlign: "end",
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
    marginTop: "200px",
    color: "#8fcc66",
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
