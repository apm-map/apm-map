import React from "react";
import Layout from "../components/layout/Layout";
import { Context } from "../components/layout/Provider";
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
];

export default function DirectoryPage() {
  return (
    <Layout>
      <Context.Consumer>
        {(context) => (
          <>
            <SEO lang={"en"} title={"directory"} keywords={keywords} />
            <Hero
              id="directory-hero"
              title="The Journey"
              subtitle="Explore our directory of resources that'll help you get the lay of the land"
              emoji={<Emoji symbol="⛰️" label="mountain" />}
            />
            <Directory context={context} />
          </>
        )}
      </Context.Consumer>
    </Layout>
  );
}
