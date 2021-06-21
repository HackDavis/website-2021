import React from 'react'
import { Link } from "gatsby"
import styles from "../components/css/about.module.css"

import AboutTopPage from './about_top';
import AboutBotPage from './about_bot'
import Footer from './footer'

const About = () => {
    return (
        <div className={styles.about_container}>
            <AboutTopPage/>
            <AboutBotPage/>
            <Footer></Footer>
        </div>
    )
}

export default About