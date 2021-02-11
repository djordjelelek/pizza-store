import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../AuthContext/AuthContext";

const useStyles = makeStyles((theme) => ({
  Header: {
    textAlign: "center",
  },
  Text: {
    // backgroundColor: "red",
    // maxWidth: "80%",
  },
  ContainerElement: {
    textAlign: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  Ingridients: {
    // fontSize: "15px",
    maxWidth: "80%",
    // textAlign: "start",
    textAlign: "justify",
  },
  Prices: {
    // fontSize: "15px",
    // height: "100%",
    // right: 0,
    top: 0,
    textAlign: "end",
    // marginTop: "-45px",
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
function Receipt(props) {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const { token } = useAuth();
  const { userId } = useAuth();
  const history = useHistory();

  const day = new Date().getDay();
  const mounth = new Date().getDate() - 1;
  const year = new Date().getFullYear();
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  const seconds = new Date().getMinutes();
  const date =
    "Date: " +
    day +
    "." +
    mounth +
    "." +
    year +
    ". Time: " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  const finalPrice = Math.round(
    props.ordersList
      .map((el) => (el.price * 0.8 * 100) / 100)
      .reduce((el, res) => el + res)
  ).toFixed(2);

  const createOrder = () => {
    props.setLoading(true);
    setTimeout(() => {
      history.push("/home");
    }, 300);
    const pizzas = props.ordersList.map((el) => [
      el.recipe,
      Math.round((el.price * 0.8 * 100) / 100).toFixed(2),
    ]);
    const order = {
      userId: userId,
      pizza: pizzas,
      finalPrice: finalPrice,
      date: date,
    };
    axios.post(
      "https://pizza-app-rg-default-rtdb.firebaseio.com/orders.json?auth=" +
        token,
      order
    );
    const deleteCarts = props.keys.map((key, index) =>
      axios.delete(
        "https://pizza-app-rg-default-rtdb.firebaseio.com/carts/" +
          key +
          ".json?auth=" +
          token
      )
    );
    axios.all(deleteCarts);
    props.setOrdersList([]);
  };

  return (
    <Dialog
      open={props.openReceipt}
      onClose={() => props.handleClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.Container}
    >
      <DialogTitle id="alert-dialog-title" className={classes.Header}>
        {"Final Receipt"}
      </DialogTitle>
      <List>
        {props.ordersList.map((el, index) => (
          <ListItem key={index}>
            <ListItemText className={classes.Ingridients}>
              <strong>ingridents</strong>:&nbsp;
              {el.recipe.map((el) => el + ", ")}
            </ListItemText>
            <ListItemText className={classes.Prices}>
              {el.price} RSD
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem>
          <ListItemText>{date}</ListItemText>
          <ListItemText>
            {"Final prize: "}
            {finalPrice}
          </ListItemText>
        </ListItem>
      </List>
      <DialogActions>
        <Button onClick={() => props.handleClose()} color="primary">
          Disagree
        </Button>
        <Button onClick={() => createOrder()} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Receipt;
