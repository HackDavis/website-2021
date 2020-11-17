import React, { useEffect } from "react"

import styles from "./css/section_landing.module.css"
import Typed from "typed.js"
import Login from "./login"
import parallaxstyles from "./css/parallax.module.css"
import { Parallax } from "react-scroll-parallax"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

const LandingSection = () => {
    let typed

    useEffect(() => {
        // set typed
        typed = new Typed("#typed", {
            strings: ["// code for social good"],
            typeSpeed: 30,
            backSpeed: 8,
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

    return (
        <div className="container-fluid p-0">
            <div className={`row no-gutters align-items-center ${styles.background}`}>
                {/* <Parallax y={["-400px", "400px"]}>
                    <div className={parallaxstyles.testbox1}></div>
                </Parallax>
                <Parallax y={["-300px", "300px"]}>
                    <div className={parallaxstyles.testbox2}></div>
                </Parallax> */}
                <div className={`col-sm-10 offset-sm-1 col-xl-6 offset-xl-3 col-sm-10 offset-sm-1 ${styles.landingContainer}`}>
                    <div className={styles.title}>
                        HACK<span className={styles.boldTitle}>DAVIS</span>
                        <br></br>
                        <div className={styles.typedcontainer}>
                            <div className={styles.typedtext} id="typed"></div>
                        </div>
                    </div>
                    <div className={styles.sponsorImage}></div>
                    <div className={styles.buttoncontainer}>
                        <button>APPLY</button>
                        <button>SPONSOR US</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingSection
