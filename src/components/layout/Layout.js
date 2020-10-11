import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { Context } from "./Context";
import BuyMeACoffee from "./BuyMeACoffee";
import Nav from "./Nav";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  container: {},
  navBar: {
    display: "flex",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const duration = 0.5;

const variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: duration,
      delay: duration,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration },
  },
};

export default function Layout({ location, children }) {
  const classes = useStyles();

  return (
    <Context.Consumer>
      {(context) => (
        <Container
          disableGutters
          maxWidth={false}
          className={classes.container}
        >
          <Nav context={context} />
          <AnimatePresence>
            <motion.main
              variants={variants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              {children}
            </motion.main>
          </AnimatePresence>
          <Footer />
          <BuyMeACoffee context={context} />
        </Container>
      )}
    </Context.Consumer>
  );
}
