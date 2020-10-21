import React from "react";
import { navigate } from "gatsby";
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

  function setup(context) {
    // match the navigation with the page location
    const path = location.pathname;
    const pathPrefix = path.substr(0, path.lastIndexOf("/") + 1);
    const locationPage = context.routes.findIndex((v) => v.link === pathPrefix);

    // otherwise, return a 404 (i.e. a new Gatsby page need to be added to config)
    if (locationPage === -1) {
      navigate("/404");
    }

    context.setCurrentPage(locationPage);

    // return new child nodes w/ context passed in as a prop
    return React.Children.map(children, (child) =>
      React.cloneElement(child, { context: context })
    );
  }

  return (
    <Context.Consumer>
      {(context) => {
        const childrenWithContext = setup(context);
        return (
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
                {childrenWithContext}
              </motion.main>
            </AnimatePresence>
            <Footer />
            <BuyMeACoffee context={context} />
          </Container>
        );
      }}
    </Context.Consumer>
  );
}
