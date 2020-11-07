const path = require("path");
const { createRemoteFileNode } = require("gatsby-source-filesystem");
const {
  getAllDirectoryResources,
  getAllMentors,
  getDirectoryResourceByID,
  getMentorJourneyByID,
} = require("./src/apis/airtable");

// createSchemaCustomization explicitly defines a GraphQL data type
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type RecruitingResource implements Node {
      id: String!
      rowID: String!,
      name: String!
      link: String!,
      recommendedBy: [String],
      recommendationCount: Int,
      description: String,
      featured: Boolean,
      featuredOrder: Int,
      category: String,
      tags: [String],
      type: String,
      stage: String,
      imageUrl: String!,
      image: File @link(from: "image___NODE")
    }
    type Mentor implements Node {
      id: String!,
      name: String!,
      title: String!,
      bio: String!,
      imageUrl: String!,
      image: File @link(from: "image___NODE"),
      socials: [String],
      personal: Boolean,
      recommendationIDs: [String],
      recommendations: [RecruitingResource],
      journeys: [MentorJourney]
      tip: MentorTip
    }
    type MentorJourney {
      id: String,
      title: String!,
      description: String,
      link: String
    }
    type MentorTip {
      title: String!,
      description: String,
    }
`;

  createTypes(typeDefs);
};

// called after all source plugins have created nodes
// sourceNodes manually creates nodes (useful for making build-time API calls)
// It also has the added benefit of allowing me to explicitly define and shape nodes.
exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  // Pull data from Airtable + create Gatsby nodes
  const resources = await getAllDirectoryResources();
  await resources.map((resource) => {
    const nodeID = createNodeId(`${resource.id}`);
    const fields = resource.fields;

    const node = {
      id: nodeID,
      parent: `__SOURCE__`,
      internal: {
        type: `RecruitingResource`,
        contentDigest: createContentDigest(resource),
      },
      children: [],
      rowID: fields.id,
      name: fields.name,
      description: fields.description,
      link: fields.link,
      category: fields.category,
      tags: fields.tags ? fields.tags : [],
      imageUrl: fields.image,
      featured: fields.featured ? true : false,
      featuredOrder: fields.featuredOrder ? fields.featuredOrder : -1,
      recommendationCount: fields.recommendationCount
        ? fields.recommendationCount
        : 0,
    };

    createNode(node);
  });

  // Do the same for mentors data
  const mentors = await getAllMentors();
  mentors.map(async (mentor) => {
    const nodeID = createNodeId(`${mentor.id}`);
    const fields = mentor.fields;

    // get nested mentor journeys async
    const journeys = fields.journeys
      ? fields.journeys.map(async (journeyID) => {
          const journey = await getMentorJourneyByID(journeyID);
          const fields = journey.fields;

          return {
            rowID: journey.id,
            title: fields.title,
            description: fields.description ? fields.description : "",
            link: fields.link ? fields.link : "#",
          };
        })
      : [];

    const node = {
      id: nodeID,
      parent: `__SOURCE__`,
      internal: {
        type: `Mentor`,
        contentDigest: createContentDigest(mentor),
      },
      children: [],
      rowID: fields.id,
      name: fields.name,
      title: fields.title,
      bio: fields.bio,
      imageUrl: fields.image,
      recommendationIDs: fields.recommendations ? fields.recommendations : [],
      socials: fields.socials ? fields.socials : [],
      personal: fields.personal ? true : false,
      tips: {
        title: fields.tips__title,
        description: fields.tips__description,
      },
    };

    // make sure we've finished fetching mentor joruneys before creating the node
    Promise.all(journeys).then((res) => {
      node.journeys = res;
      createNode(node);
    });
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

  if (
    node.internal.type === "RecruitingResource" ||
    node.internal.type === "Mentor"
  ) {
    // add a file node for the hosted image
    const fileNode = await createRemoteFileNode({
      url: node.imageUrl, // url string of the image
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

  if (node.internal.type === "Mentor") {
    // prepare the slug field
    const slug = `/mentors/${node.name}`.split(" ").join("-").toLowerCase();
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });

    // fetch linked resources from airtable by ID
    // since these should exist as nodes already and we created the same node ID,
    // we can link this to an existing node instead of re-fetching + creating a new node.
    Promise.all(
      node.recommendationIDs.map(async (id) => {
        const nodeID = createNodeId(`${id}`);
        return getNode(nodeID);
      })
    ).then((res) => {
      node.recommendations = res;
    });
  }
};

// called after sourcing and transformation of nodes
// createPages programmatically creates pages (often using GraphQL-queried data)
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  // Create mentor profile pages
  const profileTemplate = path.resolve(`src/templates/profileTemplate.js`);
  return graphql(`
    query mentorSlug {
      allMentor {
        nodes {
          fields {
            slug
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
    result.data.allMentor.nodes.forEach((mentor) => {
      createPage({
        path: mentor.fields.slug,
        component: profileTemplate,
        context: {
          slug: mentor.fields.slug,
        },
      });
    });
  });
};
