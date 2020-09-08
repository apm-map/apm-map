import React from "react";
import { graphql } from "gatsby";
import { Grid, Container, IconButton, Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DirectoryCard from "../components/directory/DirectoryCard";
import Emoji from "../components/util/Emoji";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import Layout from "../components/layout/Layout";
import { Context } from "../components/layout/Provider";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import { CardHeader } from "@material-ui/core";
import { Link } from "gatsby";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    boxShadow:
      "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.2),0px 1px 8px 0px #FFFFFF",
  },
  cardGrid: {
    paddingBottom: theme.spacing(8),
  },
  card: {
    maxWidth: 375,
    margin: theme.spacing(2),
  },
  icon: {
    height: 30,
    width: 30,
  },
  linkedinButton: {
    height: 50,
    width: 50,
    color: "#ffff",
    backgroundColor: "#0072b1",
    boxShadow: theme.shadows[10],
    "&:hover": {
      color: theme.palette.common.black,
      backgroundColor: theme.palette.common.white,
    },
  },
  twitterButton: {
    height: 50,
    width: 50,
    color: "#ffff",
    backgroundColor: "#00acee",
    boxShadow: theme.shadows[10],
    "&:hover": {
      color: theme.palette.common.black,
      backgroundColor: theme.palette.common.white,
    },
  },
  header: {
    margin: theme.spacing(2, 0, 2),
  },
  bio: {
    fontSize: 20,
  },
  title: {
    fontWeight: 600,
    padding: theme.spacing(2, 0, 2),
  },
  bg: {
    width: "100%",
    borderRadius: `4px 4px 0px 0px`,
  },
  columns: {
    display: "flex",
    minHeight: 500,
    width: "50%",
  },
}));

export default function Profile({ data }) {
  const classes = useStyles();
  const mentor = data.allMentorsJson.nodes[0];
  const recommendations = data.allResourcesJson.nodes;
  const nextJourneys = [
    {
      name: "Some Name",
      description:
        "this is some description about someone's next journey. So cool!",
    },
    {
      name: "Some Name",
      description:
        "this is some description about someone's next journey. So cool!",
    },
    {
      name: "Some Name",
      description:
        "this is some description about someone's next journey. So cool!",
    },
  ];

  return (
    <Layout>
      <Context.Consumer>
        {(context) => (
          <Container className={classes.container}>
            <Box className={classes.header}>
              <Paper>
                <Grid container direction="column" justify="center">
                  <Grid item>
                    <img
                      className={classes.bg}
                      src="https://media-exp1.licdn.com/dms/image/C5616AQGU8OHAZWS2ow/profile-displaybackgroundimage-shrink_350_1400/0?e=1605139200&v=beta&t=H229SMvL5XykSE7-J8biHf1b0OcpYnHNZCb5sJ65SC8"
                    />
                  </Grid>
                  <Grid item>
                    <Box
                      p={3}
                      mt="-15%"
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Avatar src={mentor.image} className={classes.avatar} />
                      <Typography
                        className={classes.title}
                        variant="h3"
                        align="center"
                        color="textPrimary"
                        gutterBottom
                      >
                        {mentor.name}
                      </Typography>
                      <Typography
                        className={classes.bio}
                        variant="body2"
                        align="center"
                        color="textSecondary"
                        paragraph
                      >
                        {mentor.bio} <Emoji symbol="🗺️" label="map" />
                      </Typography>
                      <Box p={2}>
                        <Grid container spacing={2} justify="center">
                          <Grid item>
                            <IconButton
                              href="https://www.linkedin.com/in/michelle-ma-1208/"
                              target="_blank"
                              variant="contained"
                              className={classes.linkedinButton}
                            >
                              <LinkedInIcon className={classes.icons} />
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <IconButton
                              href="https://twitter.com/michellema_97?lang=en"
                              target="_blank"
                              variant="contained"
                              className={classes.twitterButton}
                            >
                              <TwitterIcon className={classes.icons} />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
            <div style={{ display: "flex", width: "100%" }}>
              <div className={classes.columns}>
                <Grid direction="column" justify="center" alignItems="center">
                  <Box
                    p={3}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Typography
                      className={classes.title}
                      variant="h3"
                      align="center"
                      color="textPrimary"
                      gutterBottom
                    >
                      {"My Path"}
                    </Typography>
                    <Typography
                      className={classes.bio}
                      variant="body2"
                      align="center"
                      color="textSecondary"
                      paragraph
                    >
                      {"Resources that I love, recommend or have used myself!"}
                    </Typography>
                    <Divider variant="middle" light />
                    <Grid container display="flex" justify="center" spacing={4}>
                      {recommendations.map((card, index) => (
                        <Grid
                          item
                          key={index}
                          xs={10}
                          className={classes.cardGrid}
                        >
                          <DirectoryCard loading={false} data={card} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>
              </div>
              <Divider light variant="middle" orientation="vertical" flexItem />
              <div className={classes.columns}>
                <Grid direction="column" justify="center" alignItems="center">
                  <Box
                    p={3}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Typography
                      className={classes.title}
                      variant="h3"
                      align="center"
                      color="textPrimary"
                      gutterBottom
                    >
                      {"My Next Journey"}
                    </Typography>
                    <Typography
                      className={classes.bio}
                      variant="body2"
                      align="center"
                      color="textSecondary"
                      paragraph
                    >
                      {"Check out some other cool things I've worked on!"}
                    </Typography>
                    <Grid container display="flex" justify="center" spacing={4}>
                      {nextJourneys.map((card, index) => (
                        <Grid
                          item
                          key={index}
                          xs={10}
                          className={classes.cardGrid}
                        >
                          <DirectoryCard loading={false} data={card} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>
              </div>
            </div>
          </Container>
        )}
      </Context.Consumer>
    </Layout>
  );
}

export const pageQuery = graphql`
  query MyQuery($slug: String!, $recommendations: [String]) {
    allMentorsJson(filter: { fields: { slug: { eq: $slug } } }) {
      nodes {
        name
        image
        bio
        fields {
          slug
        }
      }
    }
    allResourcesJson(filter: { id: { in: $recommendations } }) {
      nodes {
        image
        description
        link
        name
        stage
        tags
        type
        category
        cost
      }
    }
  }
`;
