import axios from "axios";
import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import useStyles from "./RecieptUseStyles";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../AuthContext/AuthContext";

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
    day +
    "." +
    mounth +
    "." +
    year +
    ". " +
    (hours < 10 ? 0 + hours : "") +
    hours +
    ":" +
    (minutes < 10 ? 0 : "") +
    minutes +
    "h";

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
    <Container className={classes.Container}>
      <Dialog
        open={props.openReceipt}
        onClose={() => props.handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.ContainerDialog}
      >
        <DialogTitle
          id="alert-dialog-title"
          className={classes.Header}
          style={{ fontSize: "100px" }}
        >
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
            marginTop: "-20px",
          }}
        >
          <ListItem>
            <ListItemText style={{ marginLeft: "8px" }}>
              <i>Time: </i>
              {time}
            </ListItemText>
            <ListItemText>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</ListItemText>
            <ListItemText style={{ textAlign: "end", marginRight: "8px" }}>
              <strong>
                <i>Final price: </i>
                {finalPrice} RSD
              </strong>
            </ListItemText>
          </ListItem>
        </List>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <Button
            onClick={() => props.handleClose()}
            variant="contained"
            color="secondary"
            autoFocus
            className={classes.MuiButtonCancel}
          >
            cancel
          </Button>
          <Button
            onClick={() => createOrder()}
            variant="contained"
            color="secondary"
            className={classes.MuiButton}
          >
            &nbsp; &nbsp;Buy&nbsp; &nbsp;
          </Button>
        </div>
      </Dialog>
    </Container>
  );
}

export default Receipt;
