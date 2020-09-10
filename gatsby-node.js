const path = require("path");
const { createRemoteFileNode } = require("gatsby-source-filesystem");
const { getRows } = require("./src/apis/gsheets");

// createSchemaCustomization explicitly defines GraphQL data types
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type RecruitingResource implements Node {
      id: String!
      name: String!
      description: String,
      featured: Boolean,
      link: String!,
      category: String,
      tags: [String],
      type: String,
      stage: String,
      imageUrl: String,
      image: File @link(from: "image___NODE")
    }
  `);
};

// called after all source plugins have created nodes
// sourceNodes manually creates nodes (useful for making build-time API calls)
// It also has the added benefit of allowing me to explicitly define and shape nodes.
exports.sourceNodes = async ({
  actions,
  store,
  cache,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  // 1. Pull, sanitize and transform data from Google Sheets
  const rows = await getRows();

  // 2. Create Gatsby nodes from the sanitized Google Sheets data
  rows.map((row, index) => {
    const nodeID = createNodeId(`${index}`);
    const node = {
      id: nodeID,
      parent: `__SOURCE__`,
      internal: {
        type: `RecruitingResource`, // name of the GraphQL query --> allItem {}
        contentDigest: createContentDigest(row),
      },
      children: [],
      name: row.name,
      link: row.link,
      category: row.category,
      type: row.type,
      description: row.description,
      featured: row.featured == "TRUE" ? true : false,
      tags: row.tags,
      image: row.image,
    };

    createNode(node);
  });
};

// A "node" can be any object, and is the center of Gatsby's data system (supported by Redux for state management)
// onCreateNode is called whenever a node is created (directly or from plugins)
exports.onCreateNode = async ({
  node,
  actions,
  getNode,
  createNodeId,
  cache,
  store,
}) => {
  const { createNode, createNodeField } = actions;
  if (node.internal.type === "MentorsJson") {
    const slug = `/mentors/${node.name}`.split(" ").join("-").toLowerCase();

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }

  // For all RecruitingResource nodes that have an image url, call createRemoteFileNode
  if (node.internal.type === "RecruitingResource" && node.image !== null) {
    const fileNode = await createRemoteFileNode({
      url: node.image, // string that points to the URL of the image
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache, // Gatsby's cache
      store, // Gatsby's redux store
    });

    // if the file node was created, attach it to the parent node
    // ___NODE tells GraphQL that the name before it is going to be a field on the parent Node that links to another Node
    if (fileNode) {
      node.image___NODE = fileNode.id;
    }
  }
};

// called after sourcing and transformation of nodes
// createPages programmatically creates pages (often using GraphQL-queried data)
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  // Create mentor profile pages
  const profileTemplate = path.resolve(`src/templates/profileTemplate.js`);
  return graphql(`
    query mentorsWithResourcesQuery {
      allMentorsJson {
        edges {
          node {
            id
            name
            title
            bio
            recommendations
            image
            fields {
              slug
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    // for each mentor, create a page with a custom slug (see onCreateNode)
    // and list of recommendations passed as page context
    result.data.allMentorsJson.edges.forEach((mentor) => {
      createPage({
        path: mentor.node.fields.slug,
        component: profileTemplate,
        context: {
          recommendations: mentor.node.recommendations,
          slug: mentor.node.fields.slug,
        },
      });
    });
  });
};
