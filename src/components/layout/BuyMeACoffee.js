import React from "react";
import loadable from "@loadable/component";

import Loading from "../util/Loading";

export default function BuyMeACoffee({ context }) {
  const BMACComponent = context.isMobile
    ? loadable(() => import("./MobileBMAC"))
    : loadable(() => import("./AnimatedBMAC"));

  return <BMACComponent fallback={<Loading />} />;
}
