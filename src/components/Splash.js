import React, { useEffect, useState } from "react";
import { Frame, Stack, useAnimation, useCycle } from "framer";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Fade from "@material-ui/core/Fade";

import bg from "../../static/assets/bg-video-1.mp4";
import Video from "../components/Video";
import Emoji from "../components/Emoji";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${bg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

export default function Splash({ title, subtitle }) {
  const classes = useStyles();

  // container: top-level Frame div
  const apmContainerVariants = {
    before: {},
    after: { transition: { staggerChildren: 0.75 } },
  };

  const mapContainerVariants = {
    before: {},
    after: { transition: { staggerChildren: 0.1 } },
  };

  const springTransition = {
    type: "spring",
    damping: 15,
    stiffness: 700,
  };

  /**
   * A-P-M letter sequence
   */
  const apmControls = useAnimation();

  const letterVariants = {
    before: (i) => ({
      opacity: 0,
      x: i * 25,
      y: 25,
      transition: {
        type: "spring",
        damping: 100,
        stiffness: 500,
      },
    }),
    after: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 100,
        stiffness: 500,
      },
    },
    slide: {
      x: 0,
      transition: {
        type: "spring",
        damping: 100,
        stiffness: 500,
      },
    },
  };

  useEffect(() => {
    sequence();
  }, []);

  const mapControls = useAnimation();

  async function sequence() {
    await apmControls.start("after");
    await apmControls.start("slide");
    return await mapControls.start("after");
  }

  const mapVariants = {
    before: {
      opacity: 0,
      y: 25,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 500,
      },
    },
    after: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 500,
      },
    },
  };

  return (
    <Box className={classes.box}>
      {true && <Video src={bg} />}
      <Stack
        style={{
          display: "flex",
        }}
        center
        size="auto"
        direction="horizontal"
      >
        <Frame
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          size="auto"
          initial="before"
          animate={apmControls}
          variants={apmContainerVariants}
        >
          {["A", "P", "M"].map((letter, index) => (
            <Frame
              custom={index}
              position="relative"
              center="y"
              size="auto"
              variants={letterVariants}
            >
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="white"
                gutterBottom
              >
                {letter}
              </Typography>
            </Frame>
          ))}
        </Frame>
        <Frame
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          size="auto"
          initial="before"
          animate={mapControls}
          variants={mapContainerVariants}
        >
          <Frame
            position="relative"
            center="y"
            size="auto"
            variants={mapVariants}
          >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Map
            </Typography>
          </Frame>
          <Frame
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            center="y"
            position="relative"
            size="auto"
            variants={mapVariants}
          >
            <Typography variant="h2" align="center">
              {"\u00A0"}
              <Emoji symbol="🗺️" label="map" />
            </Typography>
          </Frame>
          <Frame
            position="relative"
            center="y"
            size="auto"
            variants={mapVariants}
          >
            <Typography variant="h6" align="center">
              <Emoji symbol="✨" label="sparkle" />
            </Typography>
          </Frame>
        </Frame>
      </Stack>
    </Box>
  );
}