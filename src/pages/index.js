import React from "react";
import Layout from "../components/layout/Layout";
import { Context } from "../components/layout/Provider";
import Directory from "../components/directory/Directory";
import Hero from "../components/util/Hero";
import Emoji from "../components/util/Emoji";
import Splash from "../components/splash/Splash";
import DirectoryPreview from "../components/splash/DirectoryPreview";
import BuyMeACoffee from "../components/layout/BuyMeACoffee";
import MentorsPreview from "../components/splash/MentorsPreview";
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
export default function IndexPage() {
  return (
    <Layout>
      <Context.Consumer>
        {(context) => (
          <>
            <SEO lang={"en"} title={"home"} keywords={keywords} />
            <Splash
              context={context}
              title="APM Map"
              subtitle="Discover resources to help you navigate your journey into product management"
            />
            <DirectoryPreview context={context} />
          </>
        )}
      </Context.Consumer>
    </Layout>
  );
}
