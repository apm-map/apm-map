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
import ScrollToElement from "../util/ScrollToElement";

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
    fontVariant: "small-caps",
  },
  subtitle: {
    color: theme.palette.grey[300],
  },
}));

export default function AnimatedSplash(props) {
  const classes = useStyles();
  const { isMobile } = useDeviceDetect();

  // container variant helper function
  const containerVariantsWithStagger = (stagger) => ({
    before: {},
    after: { transition: { staggerChildren: stagger } },
  });

  // spring transition helper function
  const springTransition = (damping, stiffness) => ({
    type: "spring",
    damping: damping,
    stiffness: stiffness,
  });

  /**
   * Frame div variants
   */
  const bgVariants = {
    before: {
      opacity: 0,
      transition: {
        ease: "easeIn",
        duration: 1,
      },
    },
    after: {
      opacity: 1,
      transition: {
        ease: "easeIn",
        duration: 1,
      },
    },
  };
  const letterVariants = {
    before: (i) => ({
      x: `calc(10vw + ${i * 50}px)`,
      y: 25,
      opacity: 0,
      transition: springTransition(100, 500),
    }),
    after: {
      opacity: 1,
      y: 0,
      transition: springTransition(100, 500),
    },
    slide: {
      x: 0,
      transition: springTransition(100, 500),
    },
  };

  const mapVariants = {
    before: {
      opacity: 0,
      y: 25,
      transition: springTransition(20, 500),
    },
    after: {
      opacity: 1,
      y: 0,
      transition: springTransition(20, 500),
    },
  };

  const arrowVariants = {
    before: {
      opacity: 0,
      y: 25,
      transition: springTransition(20, 500),
    },
    after: {
      opacity: 1,
      y: 0,
      transition: springTransition(20, 500),
    },
    pulsate: {
      y: 10,
      transition: {
        from: 0,
        to: 10,
        flip: Infinity,
        duration: 1,
      },
    },
  };

  /**
   * Animation sequence
   */
  const bgControls = useAnimation();
  const apmControls = useAnimation();
  const mapControls = useAnimation();
  const subtitleControls = useAnimation();
  const arrowControls = useAnimation();

  useEffect(() => {
    async function sequence() {
      await bgControls.start("after");
      await apmControls.start("after");
      await apmControls.start("slide");
      await mapControls.start("after");

      // no particular order for these at this point
      subtitleControls.start("after");
      arrowControls.start("after");
      arrowControls.start("pulsate");
    }

    sequence();
  }, []);

  return (
    <Box className={classes.box}>
      {isMobile ? (
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
      ) : (
        <Video src={videoSrc} />
      )}

      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        size="auto"
      >
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            lineHeight: 1, // default for MUI Typography is ~1.43
            marginBottom: "30px",
          }}
        >
          <motion.div
            style={{
              display: "flex",
            }}
            background={""}
            size="auto"
            animate={apmControls}
            variants={containerVariantsWithStagger(0.5)}
          >
            {["A", "P", "M"].map((letter, index) => {
              return (
                <motion.div
                  custom={index}
                  background={""}
                  position="relative"
                  center="y"
                  size="auto"
                  initial="before"
                  variants={letterVariants}
                >
                  <Typography
                    className={classes.title}
                    variant="h1"
                    align="center"
                    color="white"
                  >
                    {letter}
                  </Typography>
                </motion.div>
              );
            })}
          </motion.div>
          <motion.div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            background={""}
            size="auto"
            initial="before"
            animate={mapControls}
            variants={containerVariantsWithStagger(0.05)}
          >
            <motion.div
              background={""}
              position="relative"
              center="y"
              size="auto"
              initial="before"
              variants={mapVariants}
            >
              <Typography
                className={classes.title}
                variant="h1"
                align="center"
                color="textPrimary"
              >
                {"\u00A0"}
                Map
              </Typography>
            </motion.div>
            <motion.div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "10px",
              }}
              center="y"
              background={""}
              position="relative"
              size="auto"
              variants={mapVariants}
            >
              <Typography variant="h1" align="center">
                {"\u00A0"}
                <Emoji symbol="🗺️" label="map" />
              </Typography>
            </motion.div>
            <motion.div
              position="relative"
              center="y"
              size="auto"
              initial="before"
              variants={mapVariants}
              background={""}
            >
              <Typography variant="h6" align="center">
                <Emoji symbol="✨" label="sparkle" />
              </Typography>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          background={""}
          size="auto"
          initial="before"
          animate={!isMobile && subtitleControls}
          variants={containerVariantsWithStagger(0.05)}
        >
          <motion.div
            background={""}
            position="relative"
            center="y"
            size="auto"
            initial="before"
            variants={mapVariants}
          >
            <Typography
              className={classes.subtitle}
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            >
              {props.subtitle}
            </Typography>
          </motion.div>
        </motion.div>
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          background={""}
          size="auto"
          initial="before"
          animate={arrowControls}
          variants={containerVariantsWithStagger(0.05)}
        >
          <motion.div
            background={""}
            position="relative"
            center="y"
            size="auto"
            initial="before"
            variants={arrowVariants}
          >
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
          </motion.div>
        </motion.div>
      </motion.div>
    </Box>
  );
}

function ScrollToDirectory(props) {
  const { children } = props;

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#directory-preview"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Zoom in>
      <div onClick={handleClick} role="presentation">
        {children}
      </div>
    </Zoom>
  );
}
