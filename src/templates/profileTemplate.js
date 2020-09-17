import React from "react";
import { graphql } from "gatsby";
import { Grid, Container, IconButton, Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "../components/util/MediaCard";
import Emoji from "../components/util/Emoji";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import Layout from "../components/layout/Layout";
import { Context } from "../components/layout/Provider";
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
    marginTop: "-15%",
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
    width: "70%",
  },
  title: {
    fontWeight: 600,
    padding: theme.spacing(2, 0, 2),
  },
  subtitle: {
    fontSize: 20,
  },
  bg: {
    width: "100%",
    minHeight: "25vh",
    background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.background.paper})`,
    borderRadius: `4px 4px 0px 0px`,
  },
  row: {
    display: "flex",
    width: "50%",
  },
}));

export default function Profile({ data }) {
  const classes = useStyles();
  const mentor = data.allMentorsJson.nodes[0];
  const recommendations = data.allRecruitingResource.nodes;

  // TODO map social icons, strip social links for name, match names + apply button/styles accordingly in a grid item
  function getSocialIconButtons() {
    //const socials = mentor.socials.split(",");
    //console.log(socials);
  }

  const nextJourneys = [
    {
      name: "Placeholder name",
      description: "this is placeholder text about someone's next journey!",
    },
    {
      name: "Placeholder name",
      description: "this is placeholder text about someone's next journey!",
    },
    {
      name: "Placeholder name",
      description: "this is placeholder text about someone's next journey!",
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
                    <div className={classes.bg} />
                  </Grid>
                  <Grid item>
                    <Box
                      pb={3}
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
                        {mentor.bio}
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
            <Box py={3}>
              <Typography
                className={classes.title}
                variant="h3"
                color="textPrimary"
              >
                {"My Path "}
                <Emoji symbol="🍃" label="leaf" />
              </Typography>
              <Typography
                className={classes.subtitle}
                variant="body2"
                color="textSecondary"
                paragraph
              >
                {"Resources that I recommend for APM recruiting"}
              </Typography>
              <Grid container display="flex" spacing={4}>
                {recommendations.map((card, index) => (
                  <Grid
                    item
                    key={index}
                    xs={12}
                    sm={6}
                    md={4}
                    className={classes.cardGrid}
                  >
                    <Card loading={false} data={card} image={card.image} />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box py={3}>
              <Typography
                className={classes.title}
                variant="h3"
                color="textPrimary"
              >
                {"My Next Journey "}
                <Emoji symbol="🌱" label="sprout" />
              </Typography>
              <Typography
                className={classes.subtitle}
                variant="body2"
                color="textSecondary"
                paragraph
              >
                {"Here's what I'm working on next"}
              </Typography>
            </Box>
          </Container>
        )}
      </Context.Consumer>
    </Layout>
  );
}

export const query = graphql`
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
    allRecruitingResource(filter: { rowID: { in: $recommendations } }) {
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
`;
