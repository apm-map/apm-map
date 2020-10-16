import React from "react";
import loadable from "@loadable/component";

import Loading from "../util/Loading";

export default function Directory({ context }) {
  const [category, setCategory] = React.useState("All");
  const toggleCategory = (value) => {
    setCategory(value);
  };

  const DirectoryComponent = context.isMobile
    ? loadable(() => import("./MobileDirectory"))
    : loadable(() => import("./AnimatedDirectory"));

  return (
    <DirectoryComponent
      fallback={<Loading />}
      category={category}
      toggleCategory={toggleCategory}
    />
  );
}
