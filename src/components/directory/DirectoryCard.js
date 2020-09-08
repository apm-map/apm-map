import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
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

export default function DirectoryCard({ loading, data }) {
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
        href={loading ? null : data.link}
        className={classes.cardActionArea}
      >
        {loading ? (
          <Skeleton variant="rect" className={classes.cardMedia} />
        ) : (
          data.image && (
            <CardMedia
              className={classes.cardMedia}
              image={data.image}
              title={data.name}
            />
          )
        )}
        <Divider variant="middle" light />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {loading ? <Skeleton variant="text" component="h2" /> : data.name}
          </Typography>
          <Typography variant="subtitle1">
            {loading ? (
              <>
                <Skeleton />
                <Skeleton />
              </>
            ) : (
              data.description
            )}
          </Typography>
        </CardContent>
        <Box className={classes.labels}>
          {loading ? (
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
          ) : (
            <>
              {data.category && (
                <Chip size="small" label={data.category} color="primary" />
              )}
              {data.tags &&
                data.tags
                  .split(",")
                  .map((value) => (
                    <Chip size="small" label={value} color="secondary" />
                  ))}
            </>
          )}
        </Box>
      </CardActionArea>
    </Card>
  );
}
