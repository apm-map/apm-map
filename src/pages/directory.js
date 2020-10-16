import React from "react";

import Layout from "../components/layout/Layout";
import Directory from "../components/directory/Directory";
import Hero from "../components/util/Hero";
import Emoji from "../components/util/Emoji";
import SEO from "../components/util/seo";

const keywords = [
  "apm",
  "APM",
  "A/PM",
  "product",
  "management",
  "recruiting",
  "linkedin",
  "github",
  "substack",
  "directory",
  "resources",
  "journey",
  "why product management",
  "find programs",
  "community",
  "interview",
  "prep",
  "technical interview",
  "books",
  "mock interviews",
  "mock interview",
];

export default function DirectoryPage({ location }) {
  return (
    <Layout location={location}>
      <SEO lang={"en"} title={"Directory"} keywords={keywords} />
      <Hero
        id="directory-hero"
        title="The Journey"
        subtitle="Explore our directory of resources that'll help you get the lay of the land"
        emoji={<Emoji symbol="⛰️" label="mountain" />}
      />
      <Directory />
    </Layout>
  );
}
