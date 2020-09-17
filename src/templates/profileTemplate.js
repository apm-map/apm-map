import React, { useState } from "react";
import { graphql } from "gatsby";
import clsx from "clsx";
import { Grid, Container, IconButton, Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import DirectoryCard from "../components/util/MediaCard";
import Emoji from "../components/util/Emoji";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import WebIcon from "@material-ui/icons/Web";
import Layout from "../components/layout/Layout";
import { Context } from "../components/layout/Provider";
import CardActionArea from "@material-ui/core/CardActionArea";
import { CardHeader } from "@material-ui/core";
import { Link } from "gatsby";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import MediumIcon from "../../assets/medium.svg";
import JourneyCard from "../components/mentors/JourneyCard";

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
  socialButton: {
    height: 50,
    width: 50,
    color: "#ffff",
    boxShadow: theme.shadows[10],
  },
  linkedinButton: {
    backgroundColor: "#0072b1",
    "&:hover": {
      color: theme.palette.common.black,
      backgroundColor: theme.palette.common.white,
    },
  },
  twitterButton: {
    backgroundColor: "#00acee",
    "&:hover": {
      color: theme.palette.common.black,
      backgroundColor: theme.palette.common.white,
    },
  },
  mediumButton: {
    backgroundColor: "#464648",
    "&:hover": {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.common.black,
    },
  },
  instagramButton: {
    background:
      "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
    "&:hover": {
      color: theme.palette.common.black,
      background: theme.palette.common.white,
    },
  },
  facebookButton: {
    backgroundColor: "#3b5998",
    "&:hover": {
      color: theme.palette.common.black,
      backgroundColor: theme.palette.common.white,
    },
  },
  personalWebsiteButton: {
    backgroundColor: "#d3d3d3",
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
  const socials = mentor.socials.split(",");
  const platforms = ["linkedin", "twitter", "medium", "instagram", "facebook"];
  const platformIcons = {
    linkedin: <LinkedInIcon className={classes.icons} />,
    twitter: <TwitterIcon className={classes.icons} />,
    medium: <MediumIcon className={classes.icons} />,
    instagram: <InstagramIcon className={classes.icons} />,
    facebook: <FacebookIcon className={classes.icons} />,
    personal: <WebIcon className={classes.icons} />,
  };
  const platformClasses = {
    linkedin: classes.linkedinButton,
    twitter: classes.twitterButton,
    medium: classes.mediumButton,
    instagram: classes.instagramButton,
    facebook: classes.facebookButton,
    personal: classes.personalWebsiteButton,
  };

  function getSocialIconButton(platform) {
    const isPlatform = (str) => str.includes(platform);
    const idx = socials.findIndex(isPlatform);

    return (
      <>
        {idx > -1 && (
          <Grid item>
            <IconButton
              href={socials[idx]}
              target="_blank"
              variant="contained"
              className={clsx(classes.socialButton, platformClasses[platform])}
            >
              {platformIcons[platform]}
            </IconButton>
          </Grid>
        )}
      </>
    );
  }

  const [raised, setRaised] = useState(false);
  const toggleRaised = () => {
    setRaised(!raised);
  };

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
                          {platforms.map((val, idx) =>
                            getSocialIconButton(val)
                          )}
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
                    <DirectoryCard
                      loading={false}
                      data={card}
                      image={card.image}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
            {mentor.journeys.length ? (
              <Box py={3}>
                <Typography
                  className={classes.title}
                  variant="h3"
                  color="textPrimary"
                >
                  {"My Next Journey"}
                  <Emoji symbol="🌱" label="sprout" />
                </Typography>
                <Typography
                  className={classes.subtitle}
                  variant="body2"
                  color="textSecondary"
                  paragraph
                >
                  {"Here's what I'm thinking about next"}
                </Typography>
                <Grid container display="flex" justify="left" spacing={4}>
                  {mentor.journeys.map((journey, index) => (
                    <Grid
                      item
                      key={index}
                      xs={12}
                      md={4}
                      className={classes.cardGrid}
                    >
                      <JourneyCard data={journey} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <></>
            )}
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
        journeys {
          description
          link
          title
        }
        socials
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
