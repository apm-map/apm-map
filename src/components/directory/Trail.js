// great blog post that taught me a lot about how SVGs work: https://www.sarasoueidan.com/blog/svg-coordinate-systems/

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

import { makeStyles, darken } from "@material-ui/core/styles";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";

import { CATEGORIES } from "../util/filters";
import TrailLabel from "./TrailLabel";

// shortened category names to better fit on the trail labels
const SHORT_CATEGORES = [
  "All",
  "Why PM",
  "Find Programs",
  "Community",
  "Interview Prep",
  "Mock Interviews",
  "Technical Interview",
  "Post-Offer",
  "Books",
];

const useStyles = makeStyles((theme) => ({
  path: {
    stroke: theme.palette.common.black,
    strokeWidth: 12,
  },
  dashedPath: {
    stroke: theme.palette.background.default,
    strokeWidth: 20,
    strokeDasharray: 30,
    marginLeft: "-100%",
  },
  filledPath: {
    stroke: "#DD4B3E",
    strokeWidth: 12,
  },
  circle: {
    stroke: theme.palette.common.black,
    strokeWidth: 6,
    fill: theme.palette.common.white,

    "&:hover": {
      cursor: "pointer",
      fill: darken("#FFF", 0.2),
      boxShadow: "0px 5px 5px #FFF",
    },
  },
  pin: {
    color: "#DD4B3E",
    stroke: "black",
    strokeWidth: 0.5,
  },
  trail: {
    overflow: "visible",
  },
  translateTrail: {
    translateX: "-10%",
    translateY: "-100%",
  },
}));

export default function Trail({ isFirefox, toggleCategory }) {
  const classes = useStyles();
  const pathRef = useRef(null);

  // state
  const [showStops, setShowStops] = useState(false);
  const pathIncrements = [0.07, 0.15, 0.25, 0.35, 0.48, 0.6, 0.73, 0.85, 0.95];
  const currentPathLength = useMotionValue(0);
  const [currentPathPoint, setCurrentPathPoint] = useState({ x: 0, y: 0 });
  const [pathPoints, setPathPoints] = useState(
    new Array(10).fill({ x: 0, y: 0 })
  );

  const trailInlineStyle = !isFirefox
    ? { overflow: "visible" }
    : {
        overflow: "visible",
        translateX: "-10%",
        translateY: "-100%",
      };
  // once our path element is mounted to the DOM, we can get its length/points
  useEffect(() => {
    function getPathPoints() {
      var pathLen = pathRef.current.getTotalLength();

      return pathIncrements.map((val, idx) => {
        var point = pathRef.current.getPointAtLength(val * pathLen);

        return {
          x: point.x,
          y: point.y,
        };
      });
    }

    var pathPoints = getPathPoints();
    setPathPoints(pathPoints);
  }, [pathRef]);

  // initialize starting path point/length + start animation sequence
  useEffect(() => {
    setCurrentPathPoint(pathPoints[0]);
    sequence();
    currentPathLength.set(pathIncrements[0]);
  }, [pathPoints, currentPathLength]);

  async function sequence() {
    await pathControls.start("after");
    await setShowStops(true);
    await circleControls.start("after");
    await pinControls.start(["after", "bounce"]);
  }

  // animate an SVG path to smoothly increase pathLength
  const pathControls = useAnimation();
  const pathKeyframes = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
  const pathVariants = {
    before: {
      pathLength: 0,
    },
    after: {
      pathLength: pathKeyframes,
      transition: {
        duration: 1.5,
      },
    },
  };

  // animate circles to zoom in (scale)
  const circleControls = useAnimation();
  const circleVariants = {
    before: {
      scale: 0,
    },
    after: {
      scale: 1,
      transition: {
        duration: 0.25,
      },
    },
    pulsate: {
      scale: 1.25,
      transition: {
        duration: 0.5,
      },
    },
  };

  const pinControls = useAnimation();
  const pinVariants = {
    before: {
      opacity: 0,
    },
    after: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    bounce: {
      y: 10,
      transition: {
        from: 0,
        to: 15,
        yoyo: Infinity,
        duration: 1,
      },
    },
  };

  // TODO implement path.getTotalLength workaround https://stackoverflow.com/questions/51889547/svg-pathlength-dont-work-on-safari

  return (
    <>
      <motion.svg width="100%" height="100%" viewBox="0 0 1600 375">
        {/** dashed trail */}
        <motion.svg
          x={isFirefox ? "0" : "-10%"}
          y={isFirefox ? "0" : "-100%"}
          style={trailInlineStyle}
        >
          <motion.path
            ref={pathRef}
            className={classes.path}
            initial="before"
            animate={pathControls}
            variants={pathVariants}
            d="m 108.57143,557.14286 c 54.71545,56.94918 137.75473,85.23698 215.85727,73.53299 42.33495,-6.34407 82.28863,-23.50566 120.40401,-42.99189 38.11538,-19.48622 75.00423,-41.48126 114.26765,-58.53643 74.82712,-32.50325 160.05864,-46.23249 238.82161,-24.97328 43.07992,11.62786 82.70562,33.13515 122.53932,53.24395 39.83369,20.10879 81.06661,39.22246 125.25301,45.43894 39.7768,5.5961 80.3348,0.47532 119.6194,-7.905 39.2845,-8.38033 77.8425,-20.00594 117.2773,-27.64843 103.9896,-20.15327 211.9087,-12.07209 315.4105,10.45291 70.1073,15.25738 138.7834,37.08393 204.8356,65.10052"
            fill="none"
          />
          <motion.path
            style={{
              stroke: "#DD4B3E",
              strokeWidth: 18,
              pathLength: currentPathLength,
            }}
            d="m 108.57143,557.14286 c 54.71545,56.94918 137.75473,85.23698 215.85727,73.53299 42.33495,-6.34407 82.28863,-23.50566 120.40401,-42.99189 38.11538,-19.48622 75.00423,-41.48126 114.26765,-58.53643 74.82712,-32.50325 160.05864,-46.23249 238.82161,-24.97328 43.07992,11.62786 82.70562,33.13515 122.53932,53.24395 39.83369,20.10879 81.06661,39.22246 125.25301,45.43894 39.7768,5.5961 80.3348,0.47532 119.6194,-7.905 39.2845,-8.38033 77.8425,-20.00594 117.2773,-27.64843 103.9896,-20.15327 211.9087,-12.07209 315.4105,10.45291 70.1073,15.25738 138.7834,37.08393 204.8356,65.10052"
            fill="none"
          />
          <motion.path
            className={classes.dashedPath}
            d="m 108.57143,557.14286 c 54.71545,56.94918 137.75473,85.23698 215.85727,73.53299 42.33495,-6.34407 82.28863,-23.50566 120.40401,-42.99189 38.11538,-19.48622 75.00423,-41.48126 114.26765,-58.53643 74.82712,-32.50325 160.05864,-46.23249 238.82161,-24.97328 43.07992,11.62786 82.70562,33.13515 122.53932,53.24395 39.83369,20.10879 81.06661,39.22246 125.25301,45.43894 39.7768,5.5961 80.3348,0.47532 119.6194,-7.905 39.2845,-8.38033 77.8425,-20.00594 117.2773,-27.64843 103.9896,-20.15327 211.9087,-12.07209 315.4105,10.45291 70.1073,15.25738 138.7834,37.08393 204.8356,65.10052"
            fill="none"
          />
        </motion.svg>
        {/** path stops  */}
        <motion.svg
          x={isFirefox ? "0" : "-10%"}
          y={isFirefox ? "0" : "-100%"}
          width="25%"
          height="25%"
          style={trailInlineStyle}
        >
          <motion.g
            initial="before"
            animate={pinControls}
            variants={pinVariants}
            style={{ overflow: "visible" }}
          >
            <RoomRoundedIcon
              x={currentPathPoint.x - 200}
              y={currentPathPoint.y - 130}
              className={classes.pin}
            />
          </motion.g>

          {showStops &&
            pathPoints.map((point, idx) => {
              const updateCategory = () => {
                setCurrentPathPoint(point);
                currentPathLength.set(pathIncrements[idx]);
                toggleCategory(CATEGORIES[idx]);
              };
              return (
                <a onClick={updateCategory}>
                  <TrailLabel label={SHORT_CATEGORES[idx]}>
                    <motion.circle
                      cx={point.x}
                      cy={point.y}
                      r="18"
                      className={classes.circle}
                      initial="before"
                      whileHover="pulsate"
                      animate={circleControls}
                      variants={circleVariants}
                    />
                  </TrailLabel>
                </a>
              );
            })}
        </motion.svg>
      </motion.svg>
    </>
  );
}
