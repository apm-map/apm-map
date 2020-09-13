import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import MobileDirectory from "./MobileDirectory";
import AnimatedDirectory from "./AnimatedDirectory";

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

export default function Directory({ context }) {
  const classes = useStyles();

  // filter (categories) state
  const [category, setCategory] = React.useState("All");
  const toggleCategory = (value) => {
    setCategory(value);
  };

  return context.isMobile ? (
    <MobileDirectory category={category} toggleCategory={toggleCategory} />
  ) : (
    <AnimatedDirectory category={category} toggleCategory={toggleCategory} />
  );
}
