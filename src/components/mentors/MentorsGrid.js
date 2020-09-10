import React from "react";
import { Grid, Container } from "@material-ui/core";
import { useStaticQuery, graphql } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";

import AvatarCard from "./AvatarCard";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
  },
  cardGrid: {
    width: "100%",
    paddingTop: theme.spacing(8),
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

export default function MentorsGrid({ category }) {
  const classes = useStyles();
  const data = useStaticQuery(graphql`
    query MentorsQuery {
      allMentorsJson {
        edges {
          node {
            id
            name
            title
            bio
            image
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  return (
    <Container disableGutters maxWidth={false}>
      <Container maxWidth="lg" className={classes.gridContainer}>
        <Grid container spacing={2} className={classes.cardGrid}>
          {data.allMentorsJson.edges.map((edge, index) => (
            <Grid item key={index} xs={12} sm={6}>
              <AvatarCard data={edge.node} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
}
