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
      journeyIDs: [String],
      journeys: [MentorJourney]
      tips: [String]
    }
    type MentorJourney implements Node {
      id: String!,
      title: String!,
      description: String,
      link: String
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
  resources.map((resource) => {
    const nodeID = createNodeId(`${resource.id}`);
    const fields = resource.fields;

    const node = {
      id: nodeID,
      parent: `__SOURCE__`,
      internal: {
        type: `RecruitingResource`, // name of the GraphQL query --> allItem {}
        contentDigest: createContentDigest(resource),
      },
      children: [],
      rowID: fields.id,
      name: fields.name,
      link: fields.link,
      category: fields.category,
      type: fields.type,
      description: fields.description,
      featured: fields.featured ? true : false,
      featuredOrder: fields.featuredOrder,
      recommendedBy: fields.recommendedBy ? fields.recommendedBy : [],
      recommendationCount: fields.recommendationCount
        ? fields.recommendationCount
        : 0,
      tags: fields.tags,
      imageUrl: fields.image,
    };

    createNode(node);
  });

  // Do the same for mentors data
  const mentors = await getAllMentors();
  mentors.map((mentor) => {
    const nodeID = createNodeId(`${mentor.id}`);
    const fields = mentor.fields;

    const node = {
      id: nodeID,
      parent: `__SOURCE__`,
      internal: {
        type: `Mentor`, // name of the GraphQL query --> allItem {}
        contentDigest: createContentDigest(mentor),
      },
      children: [],
      rowID: fields.id,
      name: fields.name,
      title: fields.title,
      bio: fields.bio,
      imageUrl: fields.image,
      recommendationIDs: fields.recommendations ? fields.recommendations : [],
      journeyIDs: fields.journeys ? fields.journeys : [],
      socials: fields.socials ? fields.socials : [],
      personal: fields.personal ? true : false,
      tips: [], // TODO: fix me
    };

    createNode(node);
  });
};

// A "node" can be any object, and is the center of Gatsby's data system (supported by Redux for state management)
// onCreateNode is called whenever a node is created (directly or from plugins)
exports.onCreateNode = async ({
  node,
  actions,
  createContentDigest,
  createNodeId,
  cache,
  store,
}) => {
  const { createNode, createNodeField } = actions;

  if (
    (node.internal.type === "RecruitingResource" ||
      node.internal.type === "Mentor") &&
    node.imageUrl
  ) {
    // add a file node for the hosted image
    const fileNode = await createRemoteFileNode({
      url: node.imageUrl, // string that points to the URL of the image
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

    // fetch linked resources from airtable by ID + add these nodes here
    node.recommendations = node.recommendationIDs.map(async (id) => {
      const resource = await getDirectoryResourceByID(id);
      console.log(resource);
      const nodeID = createNodeId(`${id}`);
      const fields = resource.fields;

      createNode({
        id: nodeID,
        parent: `__SOURCE__`,
        internal: {
          type: `RecruitingResource`, // name of the GraphQL query --> allItem {}
          contentDigest: createContentDigest(resource),
        },
        children: [],
        rowID: fields.id,
        name: fields.name,
        link: fields.link,
        category: fields.category,
        type: fields.type,
        description: fields.description,
        featured: fields.featured ? true : false,
        featuredOrder: fields.featuredOrder,
        recommendedBy: fields.recommendedBy ? fields.recommendedBy : [],
        recommendationCount: fields.recommendationCount
          ? fields.recommendationCount
          : 0,
        tags: fields.tags,
        imageUrl: fields.image,
      });
    });

    // fetch mentor journeys by ID as well (they live in a separate table)
    node.journeys = node.journeyIDs.map(async (id) => {
      const resource = await getMentorJourneyByID(id);
      const nodeID = createNodeId(`${id}`);
      const fields = resource.fields;

      createNode({
        id: nodeID,
        parent: `__SOURCE__`,
        internal: {
          type: `MentorJourney`, // name of the GraphQL query --> allItem {}
          contentDigest: createContentDigest(resource),
        },
        children: [],
        rowID: fields.id,
        title: fields.title,
        description: fields.description ? fields.description : "",
        link: fields.link ? fields.link : "#",
      });
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
