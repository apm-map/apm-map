import React from "react";
import { navigate } from "gatsby";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Emoji from "../components/util/Emoji";
import Link from "../components/util/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },

  link: {
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Box
        display="flex"
        justifyContent="center"
        alignContent="center"
        flexDirection="column"
      >
        <Box display="flex">
          <Typography variant="h3" gutterBottom>
            Page Not Found <Emoji symbol="😱" label="spooked" />
          </Typography>
        </Box>
        <Typography onClick={() => navigate("/")} variant="h6" gutterBottom>
          No worries! We all get lost sometimes - let's get you back{" "}
          <Link
            className={classes.link}
            style={{ textDecoration: "underline" }}
          >
            home
          </Link>
          .
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFound;
