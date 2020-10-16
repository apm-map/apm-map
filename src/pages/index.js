import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import Layout from "../components/layout/Layout";
import { Context } from "../components/layout/Context";
import Splash from "../components/splash/Splash";
import DirectoryPreview from "../components/splash/DirectoryPreview";
import SEO from "../components/util/seo";

const keywords = [
  "apm",
  "APM",
  "A/PM",
  "product",
  "management",
  "recruiting",
  "michelle",
  "ma",
  "jeffrey",
  "fabian",
  "mentors",
  "directory",
  "resources",
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "50vh 0px",
  },
}));

export default function IndexPage({ location }) {
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

  // TODO: make component loadable + use fallback for while loading (instead of react state)
  return (
    <Layout>
      <SEO lang={"en"} title={"Home"} keywords={keywords} />
      <Context.Consumer>
        {(context) => {
          setPageContext(context);
          return (
            <>
              <Splash context={context} />
              <DirectoryPreview context={context} />
            </>
          );
        }}
      </Context.Consumer>
    </Layout>
  );
}
