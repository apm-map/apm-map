import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import Grid from "@material-ui/core/Grid";
import Card from "../util/MediaCard";

export default function InterviewPrep() {
  const data = useStaticQuery(graphql`
    query GetInterviewPrepResources {
      allRecruitingResource(filter: { category: { eq: "Interview Prep" } }) {
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
  `);
  return (
    <>
      {data.allRecruitingResource.nodes.map((node, index) => (
        <Grid item key={index} xs={12} sm={6} lg={4}>
          <Card loading={false} data={node} image={node.image} />
        </Grid>
      ))}
    </>
  );
}
