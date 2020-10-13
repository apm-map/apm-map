import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Twitter from "./Twitter";

// Complete tutorial: https://www.gatsbyjs.org/docs/add-seo-component/

const SEO = ({ title, desc, banner, pathname, keywords, mentor, node }) => {
  const { site } = useStaticQuery(query);

  const {
    buildTime,
    siteMetadata: {
      siteUrl,
      defaultTitle,
      defaultDescription,
      defaultBanner,
      headline,
      siteLanguage,
      ogLanguage,
      author,
      twitter,
    },
  } = site;

  const seo = {
    title: title || defaultTitle,
    description: desc || defaultDescription,
    image: `${siteUrl}${banner || defaultBanner}`,
    url: `${siteUrl}${pathname || ""}`,
  };

  // schema.org in JSONLD format
  // https://developers.google.com/search/docs/guides/intro-structured-data
  // You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')

  const schemaOrgWebPage = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    url: siteUrl,
    headline,
    inLanguage: siteLanguage,
    mainEntityOfPage: siteUrl,
    description: defaultDescription,
    name: defaultTitle,
    author: {
      "@type": "Organization",
      name: author,
    },
    copyrightHolder: {
      "@type": "Organization",
      name: author,
    },
    copyrightYear: "2020",
    creator: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: author,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}${defaultBanner}`,
      },
    },
    datePublished: "2020-09-19T08:52:00+01:00",
    dateModified: buildTime,
    image: {
      "@type": "ImageObject",
      url: `${siteUrl}${defaultBanner}`,
    },
  };

  // Initial breadcrumb list

  const itemListElement = [
    {
      "@type": "ListItem",
      item: {
        "@id": siteUrl,
        name: "Homepage",
      },
      position: 1,
    },
  ];

  let mentorProfile = null;
  let mentorTwitter = "";

  /**
   * mentor manifest data
   */
  if (mentor) {
    var socials = mentor.socials.split(",");
    var isTwitter = (str) => str.includes("twitter");
    var idx = socials.findIndex(isTwitter);

    mentorTwitter = idx > -1 ? socials[idx] : "";

    mentorProfile = {
      "@context": "http://schema.org",
      "@type": "ProfilePage",
      author: {
        "@type": "Person",
        name: mentor.name,
      },
      copyrightHolder: {
        "@type": "Person",
        name: author,
      },
      copyrightYear: "2020",
      creator: {
        "@type": "Person",
        name: mentor.name,
      },
      publisher: {
        "@type": "Organization",
        name: author,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}${defaultBanner}`,
        },
      },
      datePublished: "2020-09-19T08:52:00+01:00",
      dateModified: buildTime,
      description: mentor.bio,
      headline: mentor.title,
      inLanguage: siteLanguage,
      url: seo.url,
      name: seo.title,
      image: {
        "@type": "ImageObject",
        url: seo.image,
      },
      mainEntityOfPage: seo.url,
    };
    // Push current blogpost into breadcrumb list
    itemListElement.push({
      "@type": "ListItem",
      item: {
        "@id": seo.url,
        name: seo.title,
      },
      position: 2,
    });
  }

  const breadcrumb = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    description: "Breadcrumbs list",
    name: "Breadcrumbs",
    itemListElement,
  };

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: siteLanguage,
        }}
        title={title}
        titleTemplate={`%s | ${defaultTitle}`}
        meta={[
          {
            name: `description`,
            content: seo.description,
          },
          {
            property: `image`,
            content: seo.image,
          },
          {
            property: `og:description`,
            content: seo.description,
          },
        ].concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )}
      >
        {/* Insert schema.org data conditionally (webpage/mentor) + everytime (breadcrumbs) */}
        {!mentor && (
          <script type="application/ld+json">
            {JSON.stringify(schemaOrgWebPage)}
          </script>
        )}
        {mentor && (
          <script type="application/ld+json">
            {JSON.stringify(mentorProfile)}
          </script>
        )}
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      </Helmet>
      {!mentor && (
        <Twitter
          title={seo.title}
          image={seo.image}
          desc={seo.description}
          username={twitter}
        />
      )}
      {mentorTwitter !== "" && (
        <Twitter
          title={mentor.name}
          image={mentor.image}
          desc={mentor.bio}
          username={mentorTwitter.substr(mentorTwitter.lastIndexOf("/") + 1)}
        />
      )}
    </>
  );
};

export default SEO;

SEO.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  banner: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
  node: PropTypes.object,
};

SEO.defaultProps = {
  title: null,
  desc: null,
  banner: null,
  pathname: null,
  article: false,
  node: null,
};

const query = graphql`
  query SEO {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        siteUrl
        defaultTitle: title
        defaultDescription: description
        defaultBanner: banner
        headline
        siteLanguage
        ogLanguage
        author
        twitter
      }
    }
  }
`;
