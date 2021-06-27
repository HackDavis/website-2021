/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

 import React, { useState } from "react"
 import NavBar from "./navbar"
 
 import styles from "./css/layout.module.css"
 import Section from "./section"
 import FloatingLogo from "./floatinglogo"
 import Footer from "./footer"
 import LoginModal from "./modal_login"
 import ProfileModal from "./modal_profile"
 import FAQSection from "./section_faq"
 import LandingSection from "./section_landing"
 import LiveScheduleSection from "./section_live_schedule"
 import SocialGoodSection from "./section_socialgood"
 import StatsSection from "./section_stats"
 import SponsorsSection from "./section_sponsors"
 import LivestreamSection from "./section_livestream"
 import PrizesSection from "./section_prizes"
 import TeamsSection from "./section_teams"
 import DirectorsSection from "./section_directors"
 import { ParallaxProvider } from 'react-scroll-parallax';
 import LoadingScreen from "./loadingscreen"
 
 const Layout = ({ children }) => {
   
   const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
   const [profileModalIsOpen, setProfileModalIsOpen] = useState(false);
   const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);
   const [onBottomPages, setOnBottomPages] = useState(false);
   const [coloredLogo, setColoredLogo] = useState(false);
   const [fadeAbout, setFadeAbout] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [loadProgress, setLoadProgress] = useState(false);
   const [fadeSocialGood, setFadeSocialGood] = useState(false);
 
   // Main page layout for all the different sections of the website
 
   return (
     <>
         {isLoading && <LoadingScreen loadProgress={loadProgress} isLoading={isLoading}></LoadingScreen>}
         <LoginModal isOpen={loginModalIsOpen} setIsOpen={setLoginModalIsOpen}></LoginModal>
         <ProfileModal isOpen={profileModalIsOpen} setIsOpen={setProfileModalIsOpen}></ProfileModal>
         <div>
           {/* <div className={`${styles.navbarGradient} ${onBottomPages && styles.bottomGradient}`}></div> */}
           <FloatingLogo coloredLogo={coloredLogo}></FloatingLogo>
           <NavBar hamburgerMenuIsOpen={hamburgerMenuIsOpen} setHamburgerMenuIsOpen={setHamburgerMenuIsOpen} setProfileModalIsOpen={setProfileModalIsOpen} setLoginModalIsOpen={setLoginModalIsOpen} setOnBottomPages={setOnBottomPages} setColoredLogo={setColoredLogo} setFadeAbout={setFadeAbout} setFadeSocialGood={setFadeSocialGood}></NavBar>
         </div>
         <ParallaxProvider>
             <Section id="section_landing">
                 <LandingSection isLoading={isLoading} setIsLoading={setIsLoading} setLoadProgress={setLoadProgress}></LandingSection>
             </Section>
             {/* <Section id="section_teams">
                 <TeamsSection isLoading={isLoading} setIsLoading={setIsLoading} setLoadProgress={setLoadProgress}></TeamsSection>
             </Section> */}
             {/* <Section id="section_directors">
                 <DirectorsSection isLoading={isLoading} setIsLoading={setIsLoading} setLoadProgress={setLoadProgress}></DirectorsSection>
             </Section> */}
             <Section id="section_about">
                 <StatsSection fadeAbout={fadeAbout}></StatsSection>
             </Section>
             <Section id="section_socialgood">
                 <SocialGoodSection fadeSocialGood={fadeSocialGood}></SocialGoodSection>
             </Section>
             <Section id= "section_faq">
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