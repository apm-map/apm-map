import React from "react";
import Layout from "../components/layout/Layout";
import { Context } from "../components/layout/Provider";
import Directory from "../components/directory/Directory";
import Hero from "../components/util/Hero";
import Emoji from "../components/util/Emoji";

export default function DirectoryPage() {
  return (
    <Layout>
      <Context.Consumer>
        {(context) => (
          <>
            <Hero
              id="directory-hero"
              title="The Journey"
              subtitle="Explore our directory of resources that'll help you get the lay of the land"
              emoji={<Emoji symbol="⛰️" label="mountain" />}
            />
            <Directory />
          </>
        )}
      </Context.Consumer>
    </Layout>
  );
}
