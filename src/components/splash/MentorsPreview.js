import React from "react";
import Carousel from "react-material-ui-carousel";

import { graphql, useStaticQuery } from "gatsby";

import { makeStyles, darken } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import WebIcon from "@material-ui/icons/Web";
import Button from "@material-ui/core/Button";

import Card from "../util/MediaCard";
import Link from "../util/Link";
import Emoji from "../util/Emoji";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },
  },
  carousel: {
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "40%",
    },
    margin: theme.spacing(0, 10, 0),
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(5, 0, 5),
  },
  label: {
    fontVariant: "small-caps",
  },
  title: {
    fontWeight: 900,
    padding: theme.spacing(2, 0, 2),
    width: "75%",
  },
  subtitle: {
    width: "85%",
    padding: theme.spacing(2, 0, 2),
    fontStyle: "normal",
  },
  highlights: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "40%",
    },
  },
  callout: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(5),
  },
  button: {
    width: "25%",
    padding: theme.spacing(1),
  },
}));

export default function MentorsPreview({ context }) {
  const classes = useStyles();

  return (
    <>
      <Box id="directory-preview">
        <div className={classes.header}>
          <Typography
            className={classes.label}
            color="textSecondary"
            variant="h5"
            align="center"
            gutterBottom
          >
            {"mentors"}
          </Typography>
          <Typography
            className={classes.title}
            variant="h3"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            {"Get help from those who've done it"}
          </Typography>
          <Typography
            className={classes.subtitle}
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
          >
            {
              <>
                {
                  "You are not alone. We've tapped into the vast network of awesome, successful A/PMs who are happy to help "
                }{" "}
                <Emoji symbol="🤜" label="right-facing fist" />
                <Emoji symbol="🤛" label="left-facing fist" />
              </>
            }
          </Typography>
        </div>
      </Box>
      <div className={classes.buttonContainer}>
        <Button
          component={Link}
          onClick={(event) => context.changeNav(event, 1)}
          to={"/mentors"}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          <Typography
            className={classes.label}
            color="white"
            variant="button"
            align="center"
            gutterBottom
          >
            {"Get a guide"}
          </Typography>
        </Button>
      </div>
    </>
  );
}
