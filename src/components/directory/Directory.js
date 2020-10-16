import React from "react";

import MobileDirectory from "./MobileDirectory";
import AnimatedDirectory from "./AnimatedDirectory";

export default function Directory({ context }) {
  // filter (categories) state
  const [category, setCategory] = React.useState("All");
  const toggleCategory = (value) => {
    setCategory(value);
  };

  // TODO: make these loadable()
  return context.isMobile ? (
    <MobileDirectory category={category} toggleCategory={toggleCategory} />
  ) : (
    <AnimatedDirectory category={category} toggleCategory={toggleCategory} />
  );
}
