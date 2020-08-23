import React from "react";
import { Link, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import { motion } from "framer-motion";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
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
          gutterBottom
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
            "Get advice from our network of students and recent grads in A/PM programs"
          }
        </Typography>
      </div>
      <div className={classes.signup}>
        <iframe
          src="https://thepmcollective.substack.com/embed"
          width="100%"
          height="100%"
          className={classes.substack}
          frameborder="0"
          scrolling="no"
        ></iframe>
      </div>
    </Container>
  );
}
