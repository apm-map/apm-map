import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import Layout from "../components/layout/Layout";
import { Context } from "../components/layout/Provider";
import MentorsGrid from "../components/mentors/MentorsGrid";
import SEO from "../components/util/seo";

const keywords = [
  "apm",
  "APM",
  "A/PM",
  "product",
  "management",
  "recruiting",
  "mentors",
  "michelle ma",
  "Katie Goldstein",
  "Shruti Ramanathan",
  "Dasani Madipalli ",
  "Lisa Huang-North",
  "Nancy Wang",
  "Kelly Luo",
  "Charlene Wang",
  "David Cai",
  "Nelly Lin",
  "Adam Chow",
  "Priyanka Maskar",
  "Nimalen (Nim) Sivapalan",
  "Aditi Priya",
  "David Lietjauw",
  "Umesh Khanna",
  "Sandra Luo",
  "Mahmoud Alzaghari",
  "Emmett Chen-Ran",
  "Johnathan Zhou",
  "Frank Dong",
  "Sari Abukhadra",
  "Roshni Rawal",
  "Joel Montano",
  "Max Beech",
  "Nelli Petikyan",
  "Keerthi Pradaa Balajee",
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "50vh 0px",
  },
}));

export default function MentorsPage({ location }) {
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
      <SEO lang={"en"} title={"Mentors"} keywords={keywords} />
      <Context.Consumer>
        {(context) => {
          setPageContext(context);
          return isLoading ? (
            <div className={classes.root}>
              <CircularProgress />
            </div>
          ) : (
            <>
              <MentorsGrid />
            </>
          );
        }}
      </Context.Consumer>
    </Layout>
  );
}
