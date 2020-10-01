import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import Layout from "../components/layout/Layout";
import { Context } from "../components/layout/Provider";
import Directory from "../components/directory/Directory";
import Hero from "../components/util/Hero";
import Emoji from "../components/util/Emoji";
import SEO from "../components/util/seo";

const keywords = [
  "apm",
  "APM",
  "A/PM",
  "product",
  "management",
  "recruiting",
  "linkedin",
  "github",
  "substack",
  "directory",
  "resources",
  "journey",
  "why product management",
  "find programs",
  "community",
  "interview",
  "prep",
  "technical interview",
  "books",
  "mock interviews",
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "50vh 0px",
  },
}));

export default function DirectoryPage({ location }) {
  const [isLoading, setIsLoading] = useState(true);
  const [pageContext, setPageContext] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    if (pageContext) {
      const navPath = pageContext.routes[pageContext.currentPage].link;

      if (navPath === location.pathname) {
        setIsLoading(false);
      } else {
        const locationPage = pageContext.routes.findIndex(
          (v) => v.link === location.pathname
        );
        pageContext.setCurrentPage(locationPage);
      }
    }
  }, [pageContext, location]);

  return (
    <Layout>
      <Context.Consumer>
        {(context) => {
          setPageContext(context);
          return isLoading ? (
            <div className={classes.root}>
              <CircularProgress />
            </div>
          ) : (
            <>
              <SEO lang={"en"} title={"Directory"} keywords={keywords} />
              <Hero
                id="directory-hero"
                title="The Journey"
                subtitle="Explore our directory of resources that'll help you get the lay of the land"
                emoji={<Emoji symbol="⛰️" label="mountain" />}
              />
              <Directory context={context} />
            </>
          );
        }}
      </Context.Consumer>
    </Layout>
  );
}
