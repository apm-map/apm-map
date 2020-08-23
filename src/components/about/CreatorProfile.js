import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { Grid, Divider, SvgIcon } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import IconButton from "@material-ui/core/IconButton";

import Emoji from "../util/Emoji";
import MediumIcon from "../../../assets/medium.svg";

const useStyles = makeStyles((theme) => ({
  aboutText: {
    padding: theme.spacing(2, 5, 2),
  },
  paper: {
    margin: theme.spacing(5, 0, 5),
    padding: theme.spacing(1),
  },
  avatar: {
    width: "80%",
    height: "80%",
    marginBottom: theme.spacing(2),
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
  mediumButton: {
    height: 50,
    width: 50,
    color: "#ffff",
    backgroundColor: "#464648",
    boxShadow: theme.shadows[10],
    "&:hover": {
      backgroundColor: theme.palette.common.black,
    },
  },
  githubButton: {
    height: 50,
    width: 50,
    color: "#ffff",
    backgroundColor: "#333",
    boxShadow: theme.shadows[10],
    "&:hover": {
      color: theme.palette.common.black,
      backgroundColor: theme.palette.common.white,
    },
  },
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "90%",
  },
}));

export default function CreatorProfile({
  invert,
  content,
  avatarSrc,
  github,
  linkedIn,
  medium,
  twitter,
}) {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          {!invert && (
            <Grid
              container
              item
              display="flex"
              justify="center"
              flexDirection="column"
              xs={12}
              sm={6}
            >
              {content}
            </Grid>
          )}
          <Grid
            container
            display="flex"
            justify="center"
            alignItems="center"
            xs={12}
            sm={6}
          >
            <Box className={classes.box}>
              <Avatar
                variant="rounded"
                className={classes.avatar}
                src={avatarSrc}
              />
              <Grid container justify="center" spacing={2}>
                {github && (
                  <Grid item>
                    <IconButton
                      href={github}
                      variant="contained"
                      className={classes.githubButton}
                    >
                      <GitHubIcon />
                    </IconButton>
                  </Grid>
                )}
                {linkedIn && (
                  <Grid item>
                    <IconButton
                      href={linkedIn}
                      variant="contained"
                      className={classes.linkedinButton}
                    >
                      <LinkedInIcon />
                    </IconButton>
                  </Grid>
                )}
                {medium && (
                  <Grid item>
                    <IconButton
                      href={medium}
                      variant="contained"
                      className={classes.mediumButton}
                    >
                      <MediumIcon />
                    </IconButton>
                  </Grid>
                )}
                {twitter && (
                  <Grid item>
                    <IconButton
                      href={twitter}
                      variant="contained"
                      className={classes.twitterButton}
                    >
                      <TwitterIcon />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
          {invert && (
            <Grid
              container
              item
              display="flex"
              justify="center"
              flexDirection="column"
              xs={12}
              sm={6}
            >
              {content}
            </Grid>
          )}
        </Grid>
      </Paper>
    </>
  );
}
