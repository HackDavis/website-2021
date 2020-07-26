import React, { useEffect } from "react"

import styles from "./css/section_landing.module.css"
import Typed from 'typed.js';   

const LandingSection = () => {

    useEffect(() => {
        // set typed
        var typed = new Typed('#typed', {
        strings: ['// code for social good'],
        typeSpeed: 30,
        backSpeed: 8,
        backDelay: 3500,
        startDelay: 1000,
        fadeOut: false,
        loop: true,
        shuffle: false,
        cursorChar: '_'
        });
    })

    return (
        <div className={styles.background}>
            <div className={styles.landingContainer}>
                <div className={styles.title}>
                    HACK<b>DAVIS</b><br></br>
                    <div className={styles.typedcontainer}>
                        <div className={styles.typedtext} id="typed"></div>
                    </div>
                </div>
                <div className={styles.subtext}>
                    co-hosted by
                </div>
                <div className={styles.sponsorImage}></div>
                <div className={styles.buttoncontainer}>
                    <button>Button 1</button>
                    <button>Button 2</button>
                </div>
            </div>
        </div>
    )
}

export default LandingSection