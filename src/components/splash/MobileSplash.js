import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import Emoji from "../util/Emoji";
import ScrollToElement from "../util/ScrollToElement";

const videoScreenshotSrc =
  "https://storage.googleapis.com/apm-map-assets/bg-video-screenshot.png";

const useStyles = makeStyles((theme) => ({
  bgImg: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: "100%",
    width: "100%",
    zIndex: "-1",
    objectFit: "cover",
  },
  header: {
    position: "absolute",
    top: "35%",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: 1, // default for MUI Typography is ~1.43
    marginBottom: 30,
  },
  subtitle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: theme.palette.grey[50],
  },
}));

export default function Splash(props) {
  const classes = useStyles();

  return (
    <>
      <img
        className={classes.bgImg}
        src={videoScreenshotSrc}
        alt="APM Map background"
      />
      <div className={classes.header}>
        <div className={classes.title}>
          <Typography
            className={classes.text}
            variant="h1"
            align="center"
            color="white"
          >
            {"APM MAP"}
            {"\u00A0"}
            <Emoji symbol="🗺️" label="map" />
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            className={classes.text}
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
          >
            {props.subtitle}
          </Typography>
          <ScrollToElement selector="#directory-preview" {...props}>
            <Fab
              color="transparent"
              size="small"
              variant="extended"
              aria-label="scroll to directory"
            >
              <KeyboardArrowDownIcon />
            </Fab>
          </ScrollToElement>
        </div>
      </div>
    </>
  );
}
