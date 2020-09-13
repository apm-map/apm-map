import React, { useEffect, useState } from "react";
import {
  motion,
  useViewportScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, makeStyles, darken } from "@material-ui/core/styles";

import BuyMeACoffeeIcon from "../../../assets/bmac.svg";
import Emoji from "../util/Emoji";

const useStyles = makeStyles((theme) => ({
  bmac: {
    position: "sticky",
    bottom: "2rem",
    right: "2rem",
    float: "right",
  },
  button: {
    boxShadow: theme.shadows[10],
    width: 80,
    height: 80,
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function MobileBMAC() {
  const classes = useStyles();

  return (
    <div className={classes.bmac}>
      <IconButton
        target="_blank"
        className={classes.button}
        href="https://www.buymeacoffee.com/michellema"
      >
        <BuyMeACoffeeIcon height={75} width={75} />
      </IconButton>
    </div>
  );
}
