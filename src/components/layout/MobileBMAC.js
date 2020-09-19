import React from "react";

import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

import BuyMeACoffeeIcon from "../../../assets/bmac.svg";

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
        href="https://buymeacoff.ee/jeffandmichelle"
      >
        <BuyMeACoffeeIcon height={75} width={75} />
      </IconButton>
    </div>
  );
}
