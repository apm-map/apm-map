import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import { motion } from "framer-motion";

import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Link from "../util/Link";
import MobileNav from "./MobileNav";

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
  nav: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    position: "absolute",
    top: 5,
    left: 5,
    padding: theme.spacing(2),

    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default function Nav({ context }) {
  const classes = useStyles();

  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fixed(width: 60, height: 60) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const LinkTab = (props) => {
    if (context.isMobile) {
      return <Tab component={Link} {...props} />;
    }

    return <Tab component={Link} {...props} />;
  };

  return (
    <>
      {context.isMobile ? (
        <MobileNav context={context} />
      ) : (
        <nav className={classes.nav}>
          <Link
            style={{ textDecoration: "none" }}
            to="/"
            onClick={(event) => context.changeNav(event, 0)}
          >
            <motion.div
              className={classes.logo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1.3 }}
            >
              <Img fixed={data.file.childImageSharp.fixed} alt="APM Map logo" />
            </motion.div>
          </Link>
          <Tabs
            className={classes.tabs}
            value={context.nav}
            onChange={context.changeNav}
          >
            <LinkTab label="Home" to="/" {...a11yProps(0)} />
            <LinkTab label="About" to="/about" {...a11yProps(2)} />
            <LinkTab label="Directory" to="/directory" {...a11yProps(1)} />
            <LinkTab label="Mentors" to="/mentors" {...a11yProps(3)} />
          </Tabs>
        </nav>
      )}
    </>
  );
}
