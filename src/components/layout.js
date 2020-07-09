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
import LoginModal from "./modal_login"

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
        <LoginModal></LoginModal>
        <NavBar>
          <main>{children}</main>
        </NavBar>
        <Section id="section1">Section 1<LoginModal></LoginModal></Section>
        <Section id="section2">Section 2</Section>
        <Section id="section3">Section 3</Section>
        <Section id="section4">Section 4</Section>
        <Footer></Footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
