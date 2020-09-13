import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import { motion } from "framer-motion";

import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import Link from "../util/Link";

// "a11y" = accessibility
// ARIA = Accessible Rich Internet Application and the set of attributes
// help describe the web content for screen readers
function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: 25,
  },
}));

export default function MobileNav({ context }) {
  const classes = useStyles();

  return (
    <Tabs value={context.nav} onChange={context.changeNav} variant="fullWidth">
      <Tab
        label={<Typography variant="overline">Home</Typography>}
        component={Link}
        to="/"
        onClick={(event) => context.changeNav(event, 0)}
        {...a11yProps(0)}
      />
      <Tab
        label={<Typography variant="overline">About</Typography>}
        component={Link}
        to="/about"
        onClick={(event) => context.changeNav(event, 1)}
        {...a11yProps(1)}
      />
      <Tab
        label={<Typography variant="overline">Directory</Typography>}
        component={Link}
        to="/directory"
        onClick={(event) => context.changeNav(event, 2)}
        {...a11yProps(2)}
      />
      <Tab
        label={<Typography variant="overline">Mentors</Typography>}
        component={Link}
        to="/mentors"
        onClick={(event) => context.changeNav(event, 3)}
        {...a11yProps(3)}
      />
    </Tabs>
  );
}
