/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import NavBar from "./navbar"

import "./css/layout.module.css"
import Section from "./section"
import FloatingLogo from "./floatinglogo"
import Footer from "./footer"
import LoginModal from "./modal_login"
import ProfileModal from "./modal_profile"

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
  const [profileModalIsOpen, setProfileModalIsOpen] = useState(false);
  
  return (
    <>
        <LoginModal isOpen={loginModalIsOpen} setIsOpen={setLoginModalIsOpen}></LoginModal>
        <ProfileModal isOpen={profileModalIsOpen} setIsOpen={setProfileModalIsOpen}></ProfileModal>
        <FloatingLogo></FloatingLogo>
        <NavBar setProfileModalIsOpen={setProfileModalIsOpen} setLoginModalIsOpen={setLoginModalIsOpen}></NavBar>
        <Section id="section1">Section 1</Section>
        <Section id="section2">Section 2</Section>
        <Section id="section3">Section 3</Section>
        <Section id="section4">Section 4</Section>
        <Footer></Footer>
    </>
  )
}

export default Layout
