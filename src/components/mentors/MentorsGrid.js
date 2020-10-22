import React, { useState, useEffect } from "react";
import { Grid, Container } from "@material-ui/core";
import { useStaticQuery, graphql } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";

import AvatarCard from "./AvatarCard";
import Hero from "../util/Hero";
import Emoji from "../util/Emoji";
import Pagination from "../util/Pagination";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  cardGrid: {
    width: "100%",
    paddingTop: theme.spacing(8),
  },
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 190,
  },
}));

const mentorsPerPage = 10;

export default function MentorsGrid({ category }) {
  const classes = useStyles();
  const [currentPageItems, setCurrentPageItems] = useState(null);
  const data = useStaticQuery(graphql`
    query MentorsQuery {
      allMentorsJson {
        edges {
          node {
            id
            name
            title
            bio
            image {
              childImageSharp {
                fluid(quality: 75, cropFocus: ATTENTION) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  useEffect(() => {
    setCurrentPageItems(data.allMentorsJson.edges.slice(0, mentorsPerPage));
  }, [data]);

  return (
    <Container disableGutters maxWidth={false}>
      <Hero
        title="The Guides"
        subtitle="Learn what resources current APMs used to ace their interviews "
        emoji={<Emoji symbol="🌏" label="globe" />}
      />
      {currentPageItems && (
        <Container maxWidth="lg" className={classes.gridContainer}>
          <Grid container spacing={2} className={classes.cardGrid}>
            {currentPageItems.map((edge, index) => (
              <Grid item key={index} xs={12} sm={6}>
                <AvatarCard data={edge.node} />
              </Grid>
            ))}
          </Grid>
          <Pagination
            items={data.allMentorsJson.edges}
            itemsPerPage={mentorsPerPage}
            setCurrentPageItems={setCurrentPageItems}
          />
        </Container>
      )}
    </Container>
  );
}
