/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
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

  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);


  return (
    <>
        <FloatingLogo></FloatingLogo>
        <LoginModal isOpen={loginModalIsOpen} setIsOpen={setLoginModalIsOpen}></LoginModal>
        <NavBar setLoginModalIsOpen={setLoginModalIsOpen}></NavBar>
        <Section id="section1">Section 1</Section>
        <Section id="section2">Section 2</Section>
        <Section id="section3">Section 3</Section>
        <Section id="section4">Section 4</Section>
        <Footer></Footer>
    </>
  )
}

export default Layout
