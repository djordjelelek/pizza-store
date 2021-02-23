import React, { useState } from "react";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SnackBar from "./SnackBar/SnackBar";
import { useAuth } from "../../../AuthContext/AuthContext";

const useStyles = makeStyles((theme) => ({
  Container: {
    backgroundColor: "rgba(115, 41, 18, 0.6)",
    boxShadow: "4px 4px 15px  grey",
    borderRadius: "6px",
    position: "relative",
    margin: "0px",
    marginBottom: "0px",
    padding: "30px",
    // paddingTop: "5px",
    // paddingBootom: "5px",
    // height: "100%",
    // width: "100%",
    // minWidth: "300px",
    maxWidth: "350px",
    marginLeft: "-200px",
    // minHeight: "100%",
    // maxHeight: "550px",
    // paddingTop: "20px",
    // paddingBottom: "0px",
    // marginLeft: "-150px",
    // maxWidth: "400px",
    // marginLeft: "0px",
    // marginRight: "50px",
  },
  List: {
    marginTop: "-15px",
  },
  PriceButton: {
    marginTop: "60px",
  },
  listItem: {
    marginBottom: "-5px",
    // marginBottom: "-20px",
    padding: "0px",
    paddingLeft: "10px",
    // backgroundColor: "blue",
  },
}));

const BuildControls = (props) => {
  const [price, setPrice] = useState(130);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const { logIn } = useAuth();

  const changeButtonHanler = (ingr) => {
    const ingidentsUpdate = { ...props.ingredients };
    ingidentsUpdate[ingr].show = !props.ingredients[ingr].show;
    props.setIngredients({ ...ingidentsUpdate });
    const value = props.ingredients[ingr].show;
    value
      ? setPrice((price) => price + props.ingredients[ingr].price)
      : setPrice((price) => price - props.ingredients[ingr].price);
  };
  return (
    <Container className={classes.Container}>
      <List className={classes.List}>
        {Object.keys(props.ingredients).map((ingrident, index) => (
          <ListItem
            key={index}
            button
            onClick={
              logIn ? () => changeButtonHanler(ingrident) : () => setOpen(true)
            }
            className={classes.listItem}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                style={{
                  color: "#4caf50",
                  "&:hover": {
                    color: "rgb(54, 125, 57)",
                  },
                }}
                checked={props.ingredients[ingrident].show === true}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText
              id={index}
              primary={ingrident !== "beefSauce" ? ingrident : "beef sauce"}
              className={classes.ListText}
            />
            <ListItemSecondaryAction>
              <ListItemText
                id={index}
                primary={props.ingredients[ingrident].price + ".00 RSD"}
                className={classes.ListText}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <div className={classes.PriceButton}>
        <p className={classes.Header} style={{ marginBottom: "12px" }}>
          &nbsp;&nbsp;<strong>Total price: {price} RSD</strong>&nbsp;&nbsp;
        </p>
        <SnackBar
          price={price}
          setPrice={setPrice}
          ingredients={props.ingredients}
          setIngredients={props.setIngredients}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </Container>
  );
};

export default BuildControls;
