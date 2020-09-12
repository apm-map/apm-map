import React, { useEffect } from "react";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import Emoji from "../util/Emoji";
import ScrollToElement from "../util/ScrollToElement";

const videoScreenshotSrc =
  "https://storage.googleapis.com/apm-map-assets/bg-video-screenshot.png";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    justifyContent: "center",
    height: "95vh",
    width: "100vw",
  },
  title: {
    color: theme.palette.grey[50],
  },
  subtitle: {
    color: theme.palette.grey[300],
  },
}));

export default function Splash(props) {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <img
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          height: "100%",
          width: "100%",
          zIndex: "-1",
          objectFit: "cover",
        }}
        src={videoScreenshotSrc}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        size="auto"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            lineHeight: 1, // default for MUI Typography is ~1.43
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
            background={""}
            size="auto"
          >
            <Typography
              className={classes.title}
              variant="h1"
              align="center"
              color="white"
            >
              {"APM"}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            background={""}
            size="auto"
          >
            <div background={""} position="relative" center="y" size="auto">
              <Typography
                className={classes.title}
                variant="h1"
                align="center"
                color="textPrimary"
              >
                {"\u00A0"}
                MAP
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "10px",
              }}
              center="y"
              background={""}
              position="relative"
              size="auto"
            >
              <Typography variant="h1" align="center">
                {"\u00A0"}
                <Emoji symbol="🗺️" label="map" />
              </Typography>
            </div>
            <div
              position="relative"
              center="y"
              size="auto"
              initial="before"
              background={""}
            >
              <Typography variant="h6" align="center">
                <Emoji symbol="✨" label="sparkle" />
              </Typography>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          background={""}
          size="auto"
        >
          <div background={""} position="relative" center="y" size="auto">
            <Typography
              className={classes.subtitle}
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            >
              {props.subtitle}
            </Typography>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          background={""}
          size="auto"
        >
          <div background={""} position="relative" center="y" size="auto">
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
      </div>
    </Box>
  );
}
