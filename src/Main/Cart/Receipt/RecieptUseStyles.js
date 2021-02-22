import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Header: {
    textAlign: "center",
    marginTop: "0px",
    marginBottom: "-5px",
  },
  Container: {
    color: "darkslategray",
  },
  ContainerElement: {
    textAlign: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  List: {
    width: "100%",
    marginBottom: "25px",
  },
  Ingridients: {
    maxWidth: "75%",
    marginLeft: "8px",
    marginBottom: "-6px",
  },
  Prices: {
    top: 0,
    textAlign: "end",
    marginRight: "8px",
    marginBottom: "-6px",
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
  MuiButton: {
    marginLeft: "12px",
    backgroundColor: "#8fcc66",
    "&:hover": {
      backgroundColor: "#74a653",
    },
  },
  MuiButtonCancel: {
    marginRight: "12px",
    backgroundColor: "rgb(204, 102, 102)",
    "&:hover": {
      backgroundColor: "rgb(166, 83, 83)",
    },
  },
}));

export default useStyles;
