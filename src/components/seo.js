/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({lang, meta}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            author
            description
            keywords
            og_description
          }
        }
      }
    `
  )

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={site.siteMetadata.title}
      link = {[
        {
          "rel": "icon",
          "type": "image/png",
          "href": "favicon_url"
        }
      ]}
      meta={[
        {
          name: `description`,
          content: site.siteMetadata.description,
        },
        {
          name: `keywords`,
          content: site.siteMetadata.keywords
        },
        {
          name: `author`,
          content: site.siteMetadata.author,
        },
        {
          property: `og:image`,
          content: `image_url`
        },
        {
          property: `og:title`,
          content: site.siteMetadata.title,
        },
        {
          property: `og:site_name`,
          content: site.siteMetadata.author,
        },
        {
          property: `og:description`,
          content: site.siteMetadata.og_description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property:`og:url`,
          content: `hackdavis.io`
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:image`,
          content: `image_url`
        },
        {
          name:  `twitter:site`,
          content: `@hack_davis`
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: site.siteMetadata.title,
        },
        {
          name: `twitter:description`,
          content: `HackDavis`,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
