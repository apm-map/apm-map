import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Card from "../util/MediaCard";
import WhyPM from "./WhyPM";
import FindPrograms from "./FindPrograms";
import Networking from "./Networking";
import InterviewPrep from "./InterviewPrep";
import MockInterviews from "./MockInterviews";
import TechnicalInterview from "./TechnicalInterview";
import PostOffer from "./PostOffer";
import Books from "./Books";

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

export default function DirectoryGrid({ category }) {
  const classes = useStyles();

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

  const renderFiltered = (category) => {
    switch (category) {
      case "Understand Why PM":
        return <WhyPM />;
      case "Find APM Programs":
        return <FindPrograms />;
      case "Networking":
        return <Networking />;
      case "Interview Prep":
        return <InterviewPrep />;
      case "Mock Interviews":
        return <MockInterviews />;
      case "Technical Interview":
        return <TechnicalInterview />;
      case "Post-Offer":
        return <PostOffer />;
      case "Books":
        return <Books />;
      default:
        return data.allRecruitingResource.nodes.map((node, index) => (
          <Grid item key={index} xs={12} sm={6} lg={4}>
            <Card loading={false} data={node} image={node.image} />
          </Grid>
        ));
    }
  };

  return (
    <Grid container spacing={4} className={classes.cardGrid}>
      {renderFiltered(category)}
    </Grid>
  );
}
