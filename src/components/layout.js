/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import NavBar from "./navbar"

import "./css/layout.module.css"
import Section from "./section"
import FloatingLogo from "./floatinglogo"
import Footer from "./footer"

const Layout = ({ children }) => {
  /*const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)*/

  return (
    <>
        <FloatingLogo></FloatingLogo>
        <NavBar>
          <main>{children}</main>
        </NavBar>
        <Section>Banana</Section>
        <Section id="section1">a</Section>
        <Section id="section2">b</Section>
        <Section id="section3">c</Section>
        <Footer></Footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
