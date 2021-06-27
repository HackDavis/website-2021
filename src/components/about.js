import React, {useEffect, useRef}from 'react'
import { Link } from "gatsby"
import styles from "../components/css/about.module.css"
import $ from "jquery";
import AboutTopPage from './about_top';
import AboutBotPage from './about_bot'
import Footer from './footer'

const About = ({aboutIsOpen, setAboutIsOpen}) => {
    
    return aboutIsOpen ? (
        <div className={styles.about_container}>
            <AboutTopPage setAboutIsOpen={setAboutIsOpen}/>
            <AboutBotPage/>
            <Footer></Footer>
        </div>
    ) : null 
}

export default About