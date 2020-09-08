import React from "react";

import Layout from "../components/layout/Layout";
import { Context } from "../components/layout/Provider";
import MentorsGrid from "../components/mentors/MentorsGrid";

export default function MentorsPage() {
  return (
    <Layout>
      <Context.Consumer>
        {(context) => (
          <>
            <MentorsGrid />
          </>
        )}
      </Context.Consumer>
    </Layout>
  );
}
