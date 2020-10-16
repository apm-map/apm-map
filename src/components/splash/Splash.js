import React from "react";
import loadable from "@loadable/component";

import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import Loading from "../util/Loading";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    justifyContent: "center",
    height: "95vh",
    width: "100vw",
  },
}));

export default function Splash({ context }) {
  const classes = useStyles();

  const SplashComponent = context.isMobile
    ? loadable(() => import("./MobileSplash"))
    : loadable(() => import("./AnimatedSplash"));

  return (
    <Box className={classes.box}>
      <SplashComponent
        fallback={<Loading />}
        subtitle="Discover resources to help you navigate your journey into product management"
      />
    </Box>
  );
}
