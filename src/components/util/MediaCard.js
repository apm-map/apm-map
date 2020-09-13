import React, { useState } from "react";
import Img from "gatsby-image";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";

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

export default function MediaCard({ loading, data, image }) {
  const classes = useStyles();
  const [raised, setRaised] = useState(false);
  const toggleRaised = () => {
    setRaised(!raised);
  };

  const SkeletonCard = () => (
    <Card className={classes.card}>
      <CardActionArea className={classes.cardActionArea}>
        <Skeleton variant="rect" className={classes.cardMedia} />
        <Divider variant="middle" light />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5">
            <Skeleton variant="text" component="h2" />
          </Typography>
          <Typography variant="subtitle1">
            <>
              <Skeleton />
              <Skeleton />
            </>
          </Typography>
        </CardContent>
        <Box className={classes.labels}>
          <>
            <Skeleton width={75} variant="text">
              {" "}
              <Chip />{" "}
            </Skeleton>
            <Skeleton width={75} variant="text">
              {" "}
              <Chip />{" "}
            </Skeleton>
          </>
        </Box>
      </CardActionArea>
    </Card>
  );

  const RealCard = () => (
    <Card
      className={classes.card}
      onMouseOver={toggleRaised}
      onMouseOut={toggleRaised}
      raised={raised}
    >
      <CardActionArea href={data.link} className={classes.cardActionArea}>
        <Img fluid={{ ...image.childImageSharp.fluid, aspectRatio: 16 / 9 }} />
        <Divider light />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5">
            {data.name}
          </Typography>
          <Typography variant="subtitle">{data.description}</Typography>
        </CardContent>
        {data.category && (
          <Box className={classes.labels}>
            <>
              <Chip size="small" label={data.category} color="primary" />
              {data.tags &&
                data.tags.map((value) => (
                  <Chip size="small" label={value} color="secondary" />
                ))}
            </>
          </Box>
        )}
      </CardActionArea>
    </Card>
  );

  return loading ? SkeletonCard() : RealCard();
}
