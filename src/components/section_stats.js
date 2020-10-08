import React from "react"
import { Link } from "gatsby"

import styles from "./css/section_stats.module.css"
import cloudImage from "../images/cloud.svg"


const StatsSection = () => {
    return (
        <div className={styles.background}>
            <div className={styles.cloud}>
                <img src={cloudImage}/>
            </div>
            <div className={styles.statscontainer}>
                <div className={styles.stats}>
                    600+ HACKERS<br></br>
                    24 HOURS<br></br>
                    100+ PROJECTS<br></br>
                    $25,000+ PRIZES<br></br>
                </div>
                <div className={styles.viewWinner}>
                    <a href="https://hackdavis2020.devpost.com/" target="_blank">VIEW 2020 WINNERS</a>
                </div>
            </div>
        </div>
    )
}

export default StatsSection