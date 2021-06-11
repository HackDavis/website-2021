import React from 'react'
import { Link } from "gatsby"
import styles from "../components/css/about.module.css"

import AboutTopPage from '../components/about_top';
import AboutBotPage from '../components/about_bot'
import Footer from '../components/footer'
import FloatingLogoAbout from "../components/floatinglogo_about";

const About = () => {
    return (
        <div className={styles.about_container}>
            <FloatingLogoAbout/>
            <AboutTopPage/>
            <AboutBotPage/>
            <Footer></Footer>
        </div>
    )
}

export default About