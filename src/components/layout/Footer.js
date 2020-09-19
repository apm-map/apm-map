import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 2),
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  label: {
    fontVariant: "small-caps",
  },
  title: {
    fontWeight: 800,
    width: "75%",
    padding: theme.spacing(2, 0, 2),
  },
  subtitle: {
    width: "90%",
    fontStyle: "normal",
    padding: theme.spacing(2, 0, 2),
  },
  signup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  substack: {
    background: theme.palette.background.paper,

    "& subscribe-btn": {
      background: theme.palette.primary.main,
    },
  },
}));

export default function Footer({ children }) {
  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.container}>
      <div className={classes.header}>
        <Typography
          className={classes.label}
          color="textSecondary"
          variant="h5"
          align="center"
          gutterBottom
        >
          {"newsletter"}
        </Typography>
        <Typography
          className={classes.title}
          variant="h3"
          align="center"
          color="textPrimary"
        >
          {"Want to be kept in the loop?"}
        </Typography>
        <Typography
          className={classes.subtitle}
          variant="h6"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          {
            "Sign up for our newsletter to get notified when new resources and mentors are added"
          }
        </Typography>
      </div>
      <div className={classes.signup}>
        <iframe
          title="substack"
          src="https://apmmap.substack.com/embed"
          width="80%"
          height="100%"
          className={classes.substack}
          frameborder="0"
          scrolling="no"
        ></iframe>
      </div>
    </Container>
  );
}
