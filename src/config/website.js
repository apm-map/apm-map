module.exports = {
  pathPrefix: "/", // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  title: "APM Map - apmmap.co", // Navigation and Site Title
  titleAlt: "APM Map", // Title for JSONLD
  description: "A resource hub and community for product management recruiting",
  headline: "The one-stop destination for navigating APM recruiting.", // Headline for schema.org JSONLD
  url: "https://apmmap.co", // Domain of your site. No trailing slash!
  siteLanguage: "en", // Language Tag on <html> element
  logo: "src/images/logo.png", // Used for SEO
  ogLanguage: "en_US", // Facebook Language

  // JSONLD / Manifest
  favicon: "src/images/favicon.png", // Used for manifest favicon generation
  shortName: "APM Map", // shortname for manifest. MUST be shorter than 12 characters
  author: "APM Map", // Author for schemaORGJSONLD
  themeColor: "#7ad9f5",
  backgroundColor: "#f6f6f6",

  twitter: "@musingsbymima", // Twitter Username
  facebook: "", // Facebook Site Name
  googleAnalyticsID: "UA-172152528-1",

  skipNavId: "reach-skip-nav", // ID for the "Skip to content" a11y feature
};
