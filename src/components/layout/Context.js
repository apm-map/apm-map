import React from "react";
import { graphql, navigate, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";
import useDeviceDetect from "../../hooks/useDeviceDetect";

export const Context = React.createContext();

export default function Provider({ children }) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const { isMobile } = useDeviceDetect();
  const data = useStaticQuery(
    graphql`
      query GetSiteMetadata {
        site {
          siteMetadata {
            menuLinks {
              name
              link
            }
          }
        }
      }
    `
  );

  const routes = data.site.siteMetadata.menuLinks;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Context.Provider
        value={{
          isMobile,
          routes,
          currentPage,
          setCurrentPage,
          changeNav: (_, val) => {
            setCurrentPage(val);
            navigate(routes[val].link);
          },
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
