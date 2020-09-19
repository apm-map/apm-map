import React, { useState } from "react";
import Img from "gatsby-image";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";

import Link from "../util/Link";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    flexGrow: 1,
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActionArea: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
  },
  labels: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    padding: theme.spacing(1.5),
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function JourneyCard({ data }) {
  const classes = useStyles();
  const [raised, setRaised] = useState(false);
  const toggleRaised = () => {
    setRaised(!raised);
  };

  return (
    <Card
      className={classes.card}
      onMouseOver={toggleRaised}
      onMouseOut={toggleRaised}
      raised={raised}
    >
      <CardActionArea
        target="_blank"
        href={data.link}
        className={classes.cardActionArea}
      >
        <CardHeader
          className={classes.cardHeader}
          title={data.title}
          titleTypographyProps={{
            variant: "h5",
            gutterBottom: true,
          }}
          subheader={data.description ? data.description : ""}
          subheaderTypographyProps={{
            variant: "body1",
            gutterBottom: true,
          }}
        />
      </CardActionArea>
    </Card>
  );
}
