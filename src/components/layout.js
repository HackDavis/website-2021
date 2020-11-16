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
import FAQSection from "./section_faq"
import LandingSection from "./section_landing"
import ScheduleSection from "./section_schedule"
import SocialGoodSection from "./section_socialgood"
import StatsSection from "./section_stats"
import SponsorsSection from "./section_sponsors"
import { ParallaxProvider } from 'react-scroll-parallax';

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
        <ParallaxProvider>
            <Section id="section_landing">
                <LandingSection></LandingSection>
            </Section>
            <Section id="section_about">
                <StatsSection></StatsSection>
            </Section>
            <Section id="section_socialgood">
                <SocialGoodSection></SocialGoodSection>
            </Section>
            <Section id="section_schedule">
                <ScheduleSection></ScheduleSection>
            </Section>
            <Section id="section_FAQ">
                <FAQSection></FAQSection>
            </Section>
            <Section id="section_sponsors">
              <SponsorsSection></SponsorsSection>
            </Section>
        </ParallaxProvider>
        <Footer></Footer>
    </>
  )
}

export default Layout
