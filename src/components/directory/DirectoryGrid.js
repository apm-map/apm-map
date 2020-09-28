import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Card from "../util/MediaCard";
import WhyPM from "./WhyPM";
import FindPrograms from "./FindPrograms";
import Community from "./Community";
import InterviewPrep from "./InterviewPrep";
import MockInterviews from "./MockInterviews";
import TechnicalInterview from "./TechnicalInterview";
import PostOffer from "./PostOffer";
import Books from "./Books";
import Pagination from "../util/Pagination";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    width: "100%",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
  },
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 190,
  },
}));

const resourcesPerPage = 12;

export default function DirectoryGrid({ category }) {
  const classes = useStyles();
  const [currentPageItems, setCurrentPageItems] = useState(null);
  const data = useStaticQuery(graphql`
    query GetAllRecruitingResources {
      allRecruitingResource {
        nodes {
          id
          name
          description
          category
          tags
          link
          image {
            childImageSharp {
              fluid(quality: 75, cropFocus: ATTENTION) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  useEffect(() => {
    setCurrentPageItems(data.allRecruitingResource.nodes.slice(0, resourcesPerPage));
  }, [data])

  const renderFiltered = (category) => {
    switch (category) {
      case "Understand Why PM":
        return <WhyPM resourcesPerPage={resourcesPerPage} />;
      case "Find Programs":
        return <FindPrograms resourcesPerPage={resourcesPerPage} />;
      case "Community":
        return <Community resourcesPerPage={resourcesPerPage} />;
      case "Interview Prep":
        return <InterviewPrep resourcesPerPage={resourcesPerPage} />;
      case "Mock Interviews":
        return <MockInterviews resourcesPerPage={resourcesPerPage} />;
      case "Technical Interview":
        return <TechnicalInterview resourcesPerPage={resourcesPerPage} />;
      case "Post-Offer":
        return <PostOffer resourcesPerPage={resourcesPerPage} />;
      case "Books":
        return <Books resourcesPerPage={resourcesPerPage} />;
      default:
        return (
          <>
            {currentPageItems && (
              currentPageItems.map((node, index) => (
                <Grid item key={index} xs={12} sm={6} lg={4}>
                  <Card loading={false} data={node} image={node.image} />
                </Grid>
              ))
            )}
            <Grid item xs={12}>
              <Pagination
                items={data.allRecruitingResource.nodes}
                itemsPerPage={resourcesPerPage}
                setCurrentPageItems={setCurrentPageItems}
              />
            </Grid>
          </>
        );
    }
  };

  return (
    <Grid container spacing={4} className={classes.cardGrid}>
      {renderFiltered(category)}
    </Grid>
  );
}
