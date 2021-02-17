import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../AuthContext/AuthContext";

const useStyles = makeStyles((theme) => ({
  Header: {
    textAlign: "center",
    marginTop: "-8px",
    marginBottom: "-20px",
  },
  ContainerElement: {
    textAlign: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  Ingridients: {
    maxWidth: "75%",
    textAlign: "justify",
  },
  List: {
    width: "100%",
  },
  Prices: {
    top: 0,
    textAlign: "end",
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
  const classes = useStyles();
  const { token } = useAuth();
  const { userId } = useAuth();
  const history = useHistory();

  const day = new Date().getDate();
  const mounth = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  const time =
    day + "." + mounth + "." + year + ". " + hours + ":" + minutes + "h";

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
      time: time,
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
        <strong>{"Receipt"}</strong>
      </DialogTitle>
      <List className={classes.List}>
        {props.ordersList.map((el, index) => (
          <ListItem key={index}>
            <ListItemText className={classes.Ingridients}>
              <i>Pizza {index + 1}</i>:&nbsp;
              {el.recipe.map((ingr) => {
                if (
                  ingr === el.recipe[el.recipe.length - 1] &&
                  ingr === "beefSauce"
                )
                  return "beef sauce";
                if (ingr === el.recipe[el.recipe.length - 1]) return ingr;
                if (ingr === "beefSauce") ingr = "beef sauce";
                return ingr + ", ";
              })}
            </ListItemText>
            <ListItemText className={classes.Prices}>
              {el.price}.00 RSD
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <List
        style={{
          width: "100%",
          textAlign: "center",
          display: "flex",
          justifyContent: "start",
          // justifyContent: "flex-end",
        }}
      >
        <ListItemText>
          <i>Time: </i>
          {time}
        </ListItemText>
        <ListItemText></ListItemText>
        <ListItemText>
          <strong>
            <i>Final price: </i>
            {finalPrice} RSD
          </strong>
        </ListItemText>
      </List>
      <div style={{ textAlign: "center" }}>
        <Button onClick={() => props.handleClose()} style={{ color: "red" }}>
          cancel
        </Button>
        <Button
          onClick={() => createOrder()}
          color="primary"
          autoFocus
          style={{ color: "blue" }}
        >
          buy
        </Button>
      </div>
    </Dialog>
  );
}

export default Receipt;
