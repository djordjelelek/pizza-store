import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
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
}));
function Receipt(props) {
  const classes = useStyles();
  const { token } = useAuth();
  const { userId } = useAuth();

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

  const finalReciept = props.ordersList.map((el, index) => (
    <div className={classes.ContainerElement} key={index}>
      <div className={classes.Ingridients}>
        <p>
          <strong>ingridents: </strong>
          {`${el.recipe.map((el) => " " + el)}`}
        </p>
      </div>
      <p>
        <div className={classes.Price}>
          {`${Math.round((el.price * 0.8 * 100) / 100).toFixed(2)}`} RSD
        </div>
      </p>
    </div>
  ));
  const finalPrice = Math.round(
    props.ordersList
      .map((el) => (el.price * 0.8 * 100) / 100)
      .reduce((el, res) => el + res)
  ).toFixed(2);

  const createOrder = () => {
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
    axios
      .post(
        "https://pizza-app-rg-default-rtdb.firebaseio.com/orders.json?auth=" +
          token,
        order
      )
      .then(() => {
        // setLoading(true);
        // setTimeout(() => {
        //   history.push("/cart");
        // }, 2000);
        // axios.delet
      });
    const deleteCart = props.keys.map((key, index) =>
      axios.delete(
        "https://pizza-app-rg-default-rtdb.firebaseio.com/carts/" +
          key +
          ".json?auth=" +
          token
      )
    );
    // axios.delete(
    //   "https://pizza-app-rg-default-rtdb.firebaseio.com/carts/" +
    //     props.keys[0] +
    //     ".json?auth=" +
    //     token
    // );
    axios.all(deleteCart);
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
