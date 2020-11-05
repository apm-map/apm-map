import React from "react";
import Img from "gatsby-image";
import loadable from "@loadable/component";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import JourneyCard from "../../components/mentors/JourneyCard";
import DirectoryCard from "../../components/util/MediaCard";
import Emoji from "../../components/util/Emoji";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    marginTop: "-15vh",
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
  githubButton: {
    backgroundColor: "#333",
    "&:hover": {
      color: theme.palette.common.black,
      backgroundColor: theme.palette.common.white,
    },
  },
  personalWebsiteButton: {
    backgroundColor: "#b4b4b4",
    "&:hover": {
      color: theme.palette.common.black,
      backgroundColor: theme.palette.common.white,
    },
  },
  substackButton: {
    padding: theme.spacing(1),
    backgroundColor: "#f8f8f8",
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
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "50vh 0px",
  },
}));

export default function MentorProfile({ mentor }) {
  const classes = useStyles();

  console.log(mentor);
  const socials = mentor.socials;
  const platforms = [
    "linkedin",
    "twitter",
    "medium",
    "instagram",
    "facebook",
    "github",
    "substack",
  ];

  const platformIcons = {
    linkedin: loadable(() => import("@material-ui/icons/LinkedIn")),
    twitter: loadable(() => import("@material-ui/icons/Twitter")),
    instagram: loadable(() => import("@material-ui/icons/Instagram")),
    facebook: loadable(() => import("@material-ui/icons/Facebook")),
    github: loadable(() => import("@material-ui/icons/GitHub")),
    personal: loadable(() => import("@material-ui/icons/Web")),
    medium: loadable(() => import("../../../assets/medium.svg")),
    substack: loadable(() => import("../../../assets/substack.svg")),
  };

  const platformClasses = {
    linkedin: classes.linkedinButton,
    twitter: classes.twitterButton,
    medium: classes.mediumButton,
    instagram: classes.instagramButton,
    facebook: classes.facebookButton,
    github: classes.githubButton,
    personal: classes.personalWebsiteButton,
    substack: classes.substackButton,
  };

  function getSocialIconButton(platform) {
    const isPlatform = (str) => str.includes(platform);
    const idx =
      platform === "personal"
        ? socials.length - 1
        : socials.findIndex(isPlatform);

    const PlatformIconComponent = platformIcons[platform];

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
              <PlatformIconComponent />
            </IconButton>
          </Grid>
        )}
      </>
    );
  }

  console.log(mentor);
  return (
    <Container className={classes.container}>
      <Box className={classes.header}>
        <Paper>
          <Grid container direction="column" justify="center">
            <Grid item>
              <div className={classes.bg} />
            </Grid>
            <Grid item>
              <Box
                pb={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Avatar
                  component={Img}
                  fluid={{
                    ...mentor.image.childImageSharp.fluid,
                    aspectRatio: 16 / 9,
                  }}
                  className={classes.avatar}
                />
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
                    {platforms.map((val, idx) => getSocialIconButton(val))}
                    {mentor.personal && getSocialIconButton("personal")}
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Box py={3}>
        <Typography className={classes.title} variant="h3" color="textPrimary">
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
          {mentor.recommendations.map((card, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={4}
              className={classes.cardGrid}
            >
              <DirectoryCard loading={false} data={card} image={card.image} />
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
            {"My Next Journey  "}
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
                md={6}
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
  );
}
