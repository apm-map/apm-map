import React from "react";

import Layout from "../components/layout/Layout";
import SEO from "../components/util/seo";
import Creators from "../components/about/Creators";
import Mission from "../components/about/Mission";

const keywords = [
  "apm",
  "APM",
  "A/PM",
  "product",
  "management",
  "recruiting",
  "michelle",
  "ma",
  "jeffrey",
  "fabian",
  "twitter",
  "linkedin",
  "github",
  "substack",
  "questbridge",
  "tech",
  "care",
  "second",
  "generation",
];

export default function AboutPage({ location }) {
  // TODO: make component loadable + use fallback for while loading (instead of react state)
  return (
    <Layout location={location}>
      <SEO lang={"en"} title={"About"} keywords={keywords} />
      <Mission />
      <Creators />
    </Layout>
  );
}
