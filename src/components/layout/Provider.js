import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";
import useDeviceDetect from "../../hooks/useDeviceDetect";

export const Context = React.createContext();

export default function Provider({ children }) {
  const [nav, setNav] = React.useState(0);
  const { isMobile, isFirefox } = useDeviceDetect();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Context.Provider
        value={{
          isFirefox,
          isMobile,
          nav,
          changeNav: (event, val) => setNav(val),
        }}
      >
        {children}
      </Context.Provider>
    </ThemeProvider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
};
