import { createMuiTheme } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3",
    },
    secondary: {
      main: "#03bb85 ",
      contrastText: "#ffff",
    },
  },
  typography: {
    fontFamily: '"Montserrat", serif',
    subtitle1: {
      fontFamily: "'Hind', sans-serif",
    },
    h5: {
      fontSize: 26,
      fontWeight: 600,
    },

    h2: {
      fontSize: 72,
      fontWeight: 800,
    },
  },
  shape: {
    borderRadius: 8,
  },
  mixins: {
    toolbar: {
      minHeight: 56,
    },
  },
});

// add typography breakpoints
theme.typography.h1 = {
  fontSize: 80,
  fontWeight: 1000,
  [theme.breakpoints.up("md")]: {
    fontSize: 108,
  },
};

theme.typography.h6 = {
  fontSize: 20,
  fontWeight: 400,
  fontStyle: "italic",
  [theme.breakpoints.up("md")]: {
    fontSize: 24,
  },
};

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#ffff",
      },
      position: "relative",
    },
    MuiButton: {
      label: {
        textTransform: "none",
      },
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none",
        },
      },
    },
    MuiTabs: {
      root: {
        position: "absolute",
        left: "50%",
        transform: "translate(-50%, 0)",
        color: theme.palette.text.primary,
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.black,
      },
    },
    MuiTab: {
      root: {
        margin: "0 8px",
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up("md")]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(2),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "#404854",
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

export default theme;
