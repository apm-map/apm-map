import React from "react";

import Layout from "../components/layout/Layout";
import Splash from "../components/splash/Splash";
import DirectoryPreview from "../components/splash/DirectoryPreview";
import SEO from "../components/util/seo";

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
  "mentors",
  "directory",
  "resources",
];

export default function IndexPage({ location }) {
  return (
    <Layout location={location}>
      <SEO lang={"en"} title={"Home"} keywords={keywords} />
      <Splash />
      <DirectoryPreview />
    </Layout>
  );
}
