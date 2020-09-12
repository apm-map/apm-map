import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import AnimatedSplash from "./AnimatedSplash";
import MobileSplash from "./MobileSplash";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    justifyContent: "center",
    height: "95vh",
    width: "100vw",
  },
}));

export default function Splash(props) {
  const classes = useStyles();
  const { context } = props;

  return (
    <Box className={classes.box}>
      {context.isMobile ? (
        <MobileSplash {...props} />
      ) : (
        <AnimatedSplash {...props} />
      )}
    </Box>
  );
}
