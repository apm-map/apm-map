import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout/Layout";
import MentorProfile from "../components/mentors/MentorProfile";

export default function Profile({ location, data }) {
  return (
    <Layout location={location}>
      <MentorProfile
        mentor={data.allMentorsJson.nodes[0]}
        recommendations={data.allRecruitingResource.nodes}
      />
    </Layout>
  );
}

export const query = graphql`
  query MyQuery($slug: String!, $recommendations: [String]) {
    allMentorsJson(filter: { fields: { slug: { eq: $slug } } }) {
      nodes {
        name
        image {
          childImageSharp {
            fluid(quality: 75, cropFocus: ATTENTION) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        bio
        tips {
          title
          description
        }
        journeys {
          description
          link
          title
        }
        socials
        personal
        fields {
          slug
        }
      }
    }
    allRecruitingResource(filter: { rowID: { in: $recommendations } }) {
      nodes {
        id
        name
        description
        category
        tags
        link
        image {
          childImageSharp {
            fluid(quality: 75, cropFocus: ATTENTION) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
