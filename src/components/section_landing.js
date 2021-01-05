import React, { useEffect } from "react"

import LandingBackground from "./landing_background"
import styles from "./css/section_landing.module.css"
import Typed from "typed.js"
import Login from "./login"
import parallaxstyles from "./css/parallax.module.css"
import { Parallax } from "react-scroll-parallax"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import scrollTo from 'gatsby-plugin-smoothscroll';

const LandingSection = (props) => {
    let typed

    useEffect(() => {
        // set typed
        typed = new Typed("#typed", {
            strings: ["// code for social good"],
            typeSpeed: 30,
            backSpeed: 30,
            backDelay: 3500,
            startDelay: 1000,
            fadeOut: false,
            loop: true,
            shuffle: false,
            cursorChar: "_",
        })

        // Cleanup event handlers
        return () => {
            // clean up the event handler when the component unmounts
            typed.destroy()
        }
    })

    function OnClickBehavior(section_id){
        scrollTo(`#${section_id}`)
    }

    return (
        <div className="container-fluid p-0">
            <div className={`row no-gutters align-items-center ${styles.background}`}>
                <LandingBackground {...props}></LandingBackground>
                <a id="mlh-trust-badge" className={styles.trust_badge} href="https://mlh.io/seasons/2021/events?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2021-season&utm_content=white" target="_blank"><img src="https://s3.amazonaws.com/logged-assets/trust-badge/2021/mlh-trust-badge-2021-white.svg" alt="Major League Hacking 2021 Hackathon Season" style={{width: "100%"}} /></a>
                <div className={`col-sm-10 offset-sm-1 col-xl-6 offset-xl-3 col-sm-10 offset-sm-1 ${styles.landingContainer}`}>
                    <div className={styles.title}>
                        HackDavis
                        <br></br>
                        <div className={styles.typedcontainer}>
                            <div className={styles.typedtext} id="typed"></div>
                        </div>
                    </div>
                    <div className={styles.buttoncontainer}>
                        <button className={styles.applyButton} onClick={() => window.open('https://hackdavis.typeform.com/to/l8vIKWhD')}>SUBMIT PROJECT</button>
                        <button className={`${styles.sponsorButton}`} onClick={() => window.open('https://discord.gg/wc6QQEc')}>
                            <i className={`fab fa-discord ${styles.icon}`} aria-hidden="true"></i>
                            HELP
                        </button>
                    </div>
                </div>
                <div className={styles.start_button_container} onClick={()=> OnClickBehavior('section_about')}>
                    <div className={styles.start_button_text}>START</div>
                    <div className={styles.start_button_button}>
                        <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 2L10 10L18 2" stroke="white" strokeWidth="3"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingSection
