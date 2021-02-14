import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  footer: {
    paddingTop: "8px",
    marginTop: "auto",
    backgroundColor: "#ffd380",
  },
  Icons: {
    marginBottom: "-10px",
  },
  Owner: {
    fontSize: "12px",
    marginBottom: "6px",
    color: "#fff",
  },
  LinedIn: {
    marginRight: "3px",
  },
  GitHub: {
    marginLeft: "3px",
  },
  MuiIcon: {
    color: "#fff",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm" className={classes.Container}>
        <div className={classes.Icons}>
          <a
            href="https://www.linkedin.com/in/djordje-lelek-3580b7193/"
            rel="noopener noreferrer"
            target="_blank"
            className={classes.LinedIn}
          >
            <LinkedInIcon fontSize="default" style={{ color: "#fff" }} />
          </a>
          <a
            href="https://github.com/djordjelelek"
            className={classes.GitHub}
            rel="noopener noreferrer"
            target="_blank"
          >
            <GitHubIcon fontSize="default" style={{ color: "#fff" }} />
          </a>
        </div>
        <p className={classes.Owner}>Created by: Djordje Lelek</p>
      </Container>
    </footer>
  );
};
export default Footer;
