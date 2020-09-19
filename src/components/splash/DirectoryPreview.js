import React from "react";
import Carousel from "react-material-ui-carousel";

import { graphql, useStaticQuery } from "gatsby";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Card from "../util/MediaCard";
import Link from "../util/Link";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },
  },
  carouselContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      margin: theme.spacing(5, 0, 5),
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "45%",
      margin: theme.spacing(0, 10, 0),
    },
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(5, 0, 5),
  },
  title: {
    fontWeight: 900,
    padding: theme.spacing(2, 0, 2),
    width: "75%",
  },
  subtitle: {
    width: "85%",
    padding: theme.spacing(2, 0, 2),
    fontStyle: "normal",
  },
  highlights: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "40%",
    },
  },
  callout: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(5),
  },
  button: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "35%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "25%",
    },
  },
  caption: {
    marginTop: theme.spacing(3),
  },
  buttonText: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
}));

export default function DirectoryPreview({ context }) {
  const classes = useStyles();

  const data = useStaticQuery(graphql`
    query GetFeaturedResources {
      allRecruitingResource(
        filter: { featured: { eq: true } }
        sort: { fields: featuredOrder }
      ) {
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

  return (
    <>
      <Box id="directory-preview">
        <div className={classes.header}>
          <Typography
            className={classes.title}
            variant="h3"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            {"Here's to finding your"} <em>own</em> {"path."}
          </Typography>
        </div>
      </Box>
      <Container maxWidth={"xl"} className={classes.container}>
        <div className={classes.highlights}>
          <div className={classes.callout}>
            <Typography
              style={{ width: "40%" }}
              color="textSecondary"
              variant="h2"
              align="center"
              gutterBottom
            >
              {"175+"}
            </Typography>
            <Typography
              style={{ width: "60%" }}
              variant="h6"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {"APM recruiting resources"}
            </Typography>
          </div>
          <div className={classes.callout}>
            <Typography
              style={{ width: "40%" }}
              color="textSecondary"
              variant="h2"
              align="center"
              gutterBottom
            >
              {"20+"}
            </Typography>
            <Typography
              style={{ width: "60%" }}
              variant="h6"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {"PM mentors"}
            </Typography>
          </div>
          <div className={classes.callout}>
            <Typography
              style={{ width: "40%" }}
              color="textSecondary"
              variant="h2"
              align="center"
              gutterBottom
            >
              {"1"}
            </Typography>
            <Typography
              style={{ width: "60%" }}
              variant="h6"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {"journey"}
            </Typography>
          </div>
        </div>
        <div className={classes.carouselContainer}>
          <Carousel
            navButtonsAlwaysVisible
            autoPlay={!context.isMobile}
            animation="slide"
            interval={6000}
          >
            {data.allRecruitingResource.nodes.map((node, index) => (
              <div className={classes.item}>
                <Grid justify="center" item xs={12}>
                  <Card loading={false} data={node} image={node.image} />
                </Grid>
              </div>
            ))}
          </Carousel>
          <Typography
            className={classes.caption}
            color="textSecondary"
            variant="caption"
            align="center"
            gutterBottom
          >
            {"* some are affiliate links, all are our genuine recommendations"}
          </Typography>
        </div>
      </Container>
      <div className={classes.buttonContainer}>
        <Button
          component={Link}
          onClick={(event) => context.changeNav(event, 2)}
          to={"/directory"}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          <Typography variant="button" align="center">
            {"start exploring"}
          </Typography>
        </Button>
      </div>
      <Divider variant="middle" light />
    </>
  );
}
