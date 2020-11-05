import React, { useState } from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";

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

  console.log(data);

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
