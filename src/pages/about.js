import React, {useState, useEffect} from 'react'
import { Link } from "gatsby"
import styles from "../components/css/about.module.css"
import $ from "jquery";
import AboutTopPage from '../components/about_top';
import AboutBotPage from '../components/about_bot';
import Footer from '../components/footer';
import FloatingLogoAbout from '../components/floatinglogo_about';
import {Helmet} from "react-helmet";

const About = ({aboutIsOpen, setAboutIsOpen}) => {

    return (
        <div className={styles.about_container}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>About Us</title>
            </Helmet>
            <FloatingLogoAbout/>
            <AboutTopPage/>
            <AboutBotPage/>
            <Footer></Footer>
        </div>
        )
}
export default About