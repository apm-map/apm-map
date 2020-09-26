import React from "react";
import { withStyles, makeStyles, darken } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

const HTMLTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.secondary.main,
    color: "rgba(0, 0, 0, 0.87)",
    border: `1px solid ${darken(theme.palette.secondary.main, 0.2)}`,

    "&:hover": {
      cursor: "pointer",
      backgroundColor: darken(theme.palette.secondary.main, 0.1),

      "& $arrow": {
        color: darken(theme.palette.secondary.main, 0.1),
      }
    }
  },
  arrow: {
    color: theme.palette.secondary.main,
  },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: 16,
    fontWeight: 600,
  },
}));

export default function TrailLabel({ label, children }) {
  const classes = useStyles();

  return (
    <HTMLTooltip
      interactive
      arrow
      open={true}
      placement="bottom"
      title={
        <Typography align="center" className={classes.label}>
          {label}
        </Typography>
      }
    >
      {children}
    </HTMLTooltip>
  );
}
