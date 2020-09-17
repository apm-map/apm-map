import { createMuiTheme, darken } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7ad9f5",
      dark: darken("#7ad9f5", 0.1),
    },
    secondary: {
      default: "#bdf2d5",
      main: "#bdf2d5",
    },
    background: {
      default: "#f6f6f6",
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
      fontSize: 64,
      fontWeight: 800,
    },
    caption: {
      fontSize: 16,
      fontStyle: "italic",
    },
    button: {
      fontSize: 16,
      fontWeight: 500,
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
      },
    },
    MuiTabs: {
      root: {
        color: theme.palette.text.primary,
        margin: "0 10px",
      },
      indicator: {
        height: 3,
        backgroundColor: theme.palette.common.black,
      },
    },
    MuiTab: {
      root: {
        minWidth: 0,
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
