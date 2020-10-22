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

    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: theme.shadows[10],
    },
  },
}));

const HTMLTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 180,
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: theme.typography.pxToRem(12),
    border: `1px solid ${darken(theme.palette.background.paper, 0.2)}`,
  },
}))(Tooltip);

export default function BuyMeACoffee() {
  const classes = useStyles();

  // spring transition helper function
  const springTransition = (damping, stiffness) => ({
    type: "spring",
    damping: damping,
    stiffness: stiffness,
  });

  const buttonVariants = {
    before: {
      scale: 0,
      y: 25,
      transition: springTransition(20, 500),
    },
    after: {
      scale: 1,
      y: 0,
      transition: springTransition(20, 500),
    },
    bounce: {
      y: 0,
      transition: {
        from: 0,
        to: 2,
        yoyo: Infinity,
        duration: 0.5,
      },
    },
  };

  const [isInViewport, setIsInViewport] = useState(false);
  const { scrollYProgress } = useViewportScroll();
  const yRange = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // on viewport scroll and/or path complete, trigger animations
  useEffect(() => {
    yRange.onChange((v) => setIsInViewport(true || v >= 1));
  }, [yRange]);

  return (
    <AnimatePresence>
      {isInViewport && (
        <motion.div
          className={classes.bmac}
          initial="before"
          animate={["after", "bounce"]}
          exit={{ scale: 0 }}
          variants={buttonVariants}
        >
          <HTMLTooltip
            title={
              <Typography variant="body2">
                {
                  " If we've helped you in your journey, consider supporting ours! "
                }
                <Emoji symbol="❤️" label="heart" />
              </Typography>
            }
            placement="left"
            aria-label="help-support-us"
          >
            <IconButton
              target="_blank"
              className={classes.button}
              href="https://buymeacoff.ee/jeffandmichelle"
            >
              <BuyMeACoffeeIcon height={75} width={75} />
            </IconButton>
          </HTMLTooltip>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
