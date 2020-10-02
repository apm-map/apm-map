import React from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

// "a11y" = accessibility
// ARIA = Accessible Rich Internet Application and the set of attributes
// help describe the web content for screen readers
function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

export default function MobileNav({ context, classes }) {
  return (
    <Tabs
      className={classes.tabs}
      value={context.currentPage}
      onChange={context.changeNav}
      variant="fullWidth"
    >
      {context.routes.map((route, idx) => (
        <Tab
          label={<Typography variant="overline">{route.name}</Typography>}
          key={route.link}
          {...a11yProps(idx)}
        />
      ))}
    </Tabs>
  );
}
