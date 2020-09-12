import React, { useEffect } from "react";
import { motion, useAnimation, usePresence } from "framer-motion";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Zoom from "@material-ui/core/Zoom";

import Video from "../util/Video";
import Emoji from "../util/Emoji";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import AnimatedSplash from "./AnimatedSplash";
import MobileSplash from "./MobileSplash";

const videoSrc =
  "https://storage.googleapis.com/apm-map-assets/bg-video-1-trimmed.mp4";
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
  const { isMobile } = useDeviceDetect();

  return (
    <>
      {isMobile ? <MobileSplash {...props} /> : <AnimatedSplash {...props} />}
    </>
  );
}
