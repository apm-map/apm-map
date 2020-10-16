import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Emoji from "../util/Emoji";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(5, 0, 5),
  },
  title: {
    fontWeight: 900,
    padding: theme.spacing(2, 0, 2),
    width: "75%",
  },
  subtitle: {
    fontStyle: "normal",
  },
  paper: {
    padding: theme.spacing(4, 2, 4),
    [theme.breakpoints.up("xs")]: {
      width: "95%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.up("md")]: {
      width: "75%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "60%",
    },
  },
}));

export default function AboutPage({ location }) {
  const classes = useStyles();

  return (
    <Container className={classes.header}>
      <Typography
        className={classes.title}
        variant="h3"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        {"Our Mission"}
      </Typography>
      <Paper className={classes.paper}>
        <Typography
          className={classes.subtitle}
          variant="h6"
          align="center"
          color="textSecondary"
          paragraph
        >
          {
            <>
              <strong>{"APM Map "}</strong>
              <Emoji symbol="🗺️" label="map" />
              {
                " is your one-stop destination for navigating your APM recruiting journey. Discover resources on everything from finding APM programs to acing your final onsite interviews — all with the help from our incredible mentors."
              }
            </>
          }
        </Typography>
      </Paper>
    </Container>
  );
}
