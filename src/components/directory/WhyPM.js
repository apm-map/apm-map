import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";

import Grid from "@material-ui/core/Grid";
import Card from "../util/MediaCard";
import Pagination from "../util/Pagination";

export default function WhyPM({ resourcesPerPage }) {
  const [currentPageItems, setCurrentPageItems] = useState(null);
  const data = useStaticQuery(graphql`
    query GetWhyPMResources {
      allRecruitingResource(filter: { category: { eq: "Understand Why PM" } }) {
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

  useEffect(() => {
    setCurrentPageItems(data.allRecruitingResource.nodes.slice(0, resourcesPerPage));
  }, [data, resourcesPerPage])

  return (
    <>
      {currentPageItems && (
        currentPageItems.map((node, index) => (
          <Grid item key={index} xs={12} sm={6} lg={4}>
            <Card loading={false} data={node} image={node.image} />
          </Grid>
        ))
      )}
      <Grid item xs={12}>
        <Pagination
          items={data.allRecruitingResource.nodes}
          itemsPerPage={resourcesPerPage}
          setCurrentPageItems={setCurrentPageItems}
        />
      </Grid>
    </>
  );
}
