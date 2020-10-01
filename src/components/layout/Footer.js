import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Link from "../util/Link";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 2),
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  label: {
    fontVariant: "small-caps",
  },
  title: {
    fontWeight: 800,
    width: "75%",
    padding: theme.spacing(2, 0, 2),
  },
  subtitle: {
    width: "90%",
    fontStyle: "normal",
    padding: theme.spacing(2, 0, 2),
  },
  signup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  substack: {
    background: theme.palette.background.paper,

    "& subscribe-btn": {
      background: theme.palette.primary.main,
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(3),
  },
  button: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(1, 5),
  },
}));

export default function Footer({ children }) {
  const classes = useStyles();
  const [isAdblock, setIsAdblock] = useState(false);

  /**
   * Check if an adblocker is being used on page load. Commented out since it
   * hurts performance and we aren't sure if this is a real issue or not.
   *
   * useEffect(() => {
    // Determines if the user is likely using an ad block extension
    // source: https://davidwalsh.name/detect-ad-blocker
    async function checkAdBlocker() {
      // Used to cache the result
      let isBlocked;

      async function tryRequest() {
        try {
          return fetch(
            new Request(
              "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
              {
                method: "HEAD",
                mode: "no-cors",
              }
            )
          )
            .then(function (response) {
              // Google Ads request succeeded, so likely no ad blocker
              isBlocked = false;
              return isBlocked;
            })
            .catch(function (e) {
              // Request failed, likely due to ad blocker
              isBlocked = true;
              return isBlocked;
            });
        } catch (error) {
          // fetch API error; possible fetch not supported (old browser)
          // Marking as a blocker since there was an error and so
          // we can prevent continued requests when this function is run
          console.log(error);
          isBlocked = true;
          return isBlocked;
        }
      }

      return isBlocked !== undefined ? isBlocked : await tryRequest();
    }

    setIsAdblock(checkAdBlocker());
  }, []);
   */

  return (
    <Container maxWidth={false} className={classes.container}>
      <div className={classes.header}>
        <Typography
          className={classes.label}
          color="textSecondary"
          variant="h5"
          align="center"
          gutterBottom
        >
          {"newsletter"}
        </Typography>
        <Typography
          className={classes.title}
          variant="h3"
          align="center"
          color="textPrimary"
        >
          {"Want to be kept in the loop?"}
        </Typography>
        <Typography
          className={classes.subtitle}
          variant="h6"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          {
            "Sign up for our newsletter to get notified when new resources and mentors are added"
          }
        </Typography>
      </div>

      <div className={classes.signup}>
        {isAdblock ? (
          <div className={classes.buttonContainer}>
            <Button
              target="_blank"
              href="https://apmmap.substack.com/welcome"
              component={Link}
              className={classes.button}
              variant="contained"
              color="primary"
            >
              <Typography variant="button" align="center">
                {"subscribe"}
              </Typography>
            </Button>
          </div>
        ) : (
          <iframe
            title="substack"
            src="https://apmmap.substack.com/embed"
            width="80%"
            height="100%"
            className={classes.substack}
            frameborder="0"
            scrolling="no"
          ></iframe>
        )}
      </div>
    </Container>
  );
}
