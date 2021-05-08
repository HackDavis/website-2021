import React, { useEffect, useState } from "react"

import LandingBackground from "./landing_background"
import styles from "./css/section_landing.module.css"
import Typed from "typed.js"
import Login from "./login"
import parallaxstyles from "./css/parallax.module.css"
import { Parallax } from "react-scroll-parallax"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import scrollTo from 'gatsby-plugin-smoothscroll';
import CountDownBlock from './count_down_block'

const LandingSection = (props) => {

    // States to manage countdown timer 
    const [hour, setHour] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");
    const end_date = new Date(Date.UTC(2021, 0, 18, 2, 0, 0, 0));
    
    let typed;
    let countdown_interval;

    // Used for the countdown timer 
    function EnsureTwoDigits(num)
    {
        return num < 10 ? `0${num}` : num;
    }

    // Typing animation
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

        countdown_interval = setInterval(() => 
        {
            // Date calculation
            const now = Date.now();
            const timeLeft = end_date - now;
            let seconds = Math.floor(timeLeft / 1000) % 60;
            let minutes = Math.floor(timeLeft / 1000 / 60) % 60;
            let hours = Math.floor(timeLeft / 1000 / 60 / 60);

            if (hours >= 36)
            {
                seconds = 0;
                minutes = 0;
                hours = 36;
            }

            setHour(EnsureTwoDigits(Math.max(0, hours)))
            setMinutes(EnsureTwoDigits(Math.max(0, minutes)))
            setSeconds(EnsureTwoDigits(Math.max(0,seconds)))
        }, 1000)
        
        // Cleanup event handlers
        return () => {
            // clean up the event handler when the component unmounts
            typed.destroy()
            clearInterval(countdown_interval);
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
                <div className={`col-sm-10 offset-sm-1 col-xl-10 offset-xl-1 col-sm-10 offset-sm-1 ${styles.landingContainer}`}>
                    <div className={styles.title}>
                        HackDavis
                        <div className={styles.typedcontainer}>
                            <div className={styles.typedtext} id="typed"></div>
                        </div>
                        {/* <div className={styles.block}>
                            <div className={styles.thankyou}>
                                Thank you for attending HackDavis 2021!
                            </div>
                            <div className={styles.keepaneye}>
                                Keep an eye out for HackDavis 2022!
                            </div>
                        </div> */}
                        <div className={styles.keepaneye}>
                            Keep an eye out for news about HackDavis 2022!
                        </div>
                    </div>
                    <div className={styles.buttoncontainer}>
                        {/* <button className={styles.applyButton} onClick={() => window.open('https://hackdavis.typeform.com/to/bZdj1Uq6')}>DIRECTOR APPLICATION</button> */}
                        <button className={styles.sponsorButton} onClick={() => window.open('mailto:team@hackdavis.io')}>SPONSOR 2022</button>
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
