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
  root: {
    // flexGrow: 1,
    // textAlign: "center",
    backgroundColor: "rgba(115, 41, 18, 0.6)",
    boxShadow: "4px 4px 15px  grey",
    borderRadius: "6px",
    position: "relative",
    margin: "0px",
    marginBottom: "0px",
    // padding: "15px",
    // paddingTop: "5px",
    // paddingBootom: "5px",
    height: "100%",
    width: "100%",
    minWidth: "300px",
    // paddingTop: "20px",
    // paddingBottom: "0px",
  },
  paper: {},
  listItem: {
    // marginBottom: "-5px",
    // marginBottom: "-20px",
    padding: "0px",
    paddingLeft: "10px",
    // backgroundColor: "blue",
  },
  buttons: {
    // paddingLeft: "40px",
    // paddingRight: "40px",
    // paddingBottom: "5px",
  },
  MuiButton: {
    color: "rgb(73, 134, 231)",
    // backgroundColor: "rgba(115, 41, 18, 0.4)",
    "&:hover": {
      color: "rgb(58, 105, 181)",
    },
  },
  MuiButton2: {
    color: "rgb(255, 117, 55)",
    "&:hover": {
      color: "red",
    },
  },
  Header: {
    // fontSize: "20px",
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
    <Container className={classes.root}>
      <List className={classes.paper}>
        {Object.keys(props.ingredients).map((ingrident, index) => (
          <ListItem
            key={index}
            // role={undefined}
            // dense
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
                // inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText
              id={index}
              primary={ingrident !== "beefSauce" ? ingrident : "beef sauce"}
              className={classes.ListText}
              // style={{ color: "darkslategray" }}
              // style={
              //   props.checked.includes(value)
              //     ? { textDecoration: "line-through" }
              //     : null
              // }
            />
            <ListItemSecondaryAction>
              <ListItemText
                id={index}
                primary={props.ingredients[ingrident].price + ".00 RSD"}
                className={classes.ListText}
                // style={{ color: "darkslategray" }}
                // style={
                //   props.checked.includes(value)
                //     ? { textDecoration: "line-through" }
                //     : null
                // }
              />
            </ListItemSecondaryAction>
          </ListItem>

          // <div className={classes.buttons} key={index}>
          //   {props.ingredients[ingrident].show ? (
          //     <Button
          //       color="primary"
          //       size="small"
          //       fullWidth
          //       className={classes.MuiButton}
          //       onClick={() => changeButtonHanler(ingrident, "remove")}
          //     >
          //       Remove {ingrident}
          //     </Button>
          //   ) : (
          //     <Button
          //       color="primary"
          //       size="small"
          //       fullWidth
          //       className={classes.MuiButton2}
          //       onClick={
          //         logIn
          //           ? () => changeButtonHanler(ingrident, "add")
          //           : () => setOpen(true)
          //       }
          //     >
          //       Add {ingrident}
          //     </Button>
          //   )}
          // </div>
        ))}
      </List>
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
    </Container>
  );
};

export default BuildControls;
