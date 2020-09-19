import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import DirectoryGrid from "./DirectoryGrid";
import DirectoryAppBar from "./DirectoryAppBar";

const useStyles = makeStyles((theme) => ({
  directory: {
    display: "flex",
    justifyContent: "center",
  },
  container: {
    position: "relative",
    backgroundColor: theme.palette.background.default,
  },
}));

export default function Directory({ category, toggleCategory }) {
  const classes = useStyles();

  return (
    <Container
      id="directory"
      disableGutters
      maxWidth={false}
      className={classes.container}
    >
      <DirectoryAppBar category={category} toggleCategory={toggleCategory}>
        <Container maxWidth="lg" className={classes.directory}>
          <DirectoryGrid category={category} />
        </Container>
      </DirectoryAppBar>
    </Container>
  );
}
