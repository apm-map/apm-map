import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout/Layout";
import MentorProfile from "../components/mentors/MentorProfile";

export default function Profile({ location, data }) {
  return (
    <Layout location={location}>
      <MentorProfile mentor={data.allMentor.nodes[0]} />
    </Layout>
  );
}

export const query = graphql`
  query GetFullMentorProfile($slug: String!) {
    allMentor(filter: { fields: { slug: { eq: $slug } } }) {
      nodes {
        id
        name
        title
        bio
        socials
        tips {
          title
          description
        }
        image {
          childImageSharp {
            fluid(quality: 75, cropFocus: ATTENTION) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        journeys {
          title
          description
          link
        }
        recommendations {
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
  }
`;
