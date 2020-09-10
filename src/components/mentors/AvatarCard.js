import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import CardActionArea from "@material-ui/core/CardActionArea";
import { CardHeader } from "@material-ui/core";
import { Link } from "gatsby";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

export default function AvatarCard({ data }) {
  const classes = useStyles();
  const [raised, setRaised] = React.useState(false);
  const toggleRaised = () => {
    setRaised(!raised);
  };

  function shortBio(str) {
    var shorter = str.split(" ").splice(0, 25).join(" ");
    return str.length > shorter.length ? `${shorter} ...` : shorter;
  }

  return (
    <Card
      className={classes.root}
      onMouseOver={toggleRaised}
      onMouseOut={toggleRaised}
      raised={raised}
    >
      <CardActionArea component={Link} to={data.fields.slug}>
        <CardHeader
          avatar={<Avatar src={data.image} className={classes.avatar} />}
          title={data.name}
          titleTypographyProps={{
            variant: "h5",
            gutterBottom: true,
          }}
          subheader={shortBio(data.bio)}
          subheaderTypographyProps={{
            variant: "body1",
            gutterBottom: true,
          }}
        />
      </CardActionArea>
    </Card>
  );
}
