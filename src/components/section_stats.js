import React from "react"
import { Link } from "gatsby"

import styles from "./css/section_stats.module.css"


const StatsSection = () => {
    return (
        <div className={styles.background}>
            <div className={styles.statscontainer}>
                600+ HACKERS<br></br>
                24 HOURS<br></br>
                100+ PROJECTS<br></br>
                $25,000+ PRIZES<br></br><br></br>
                <a href="https://hackdavis2020.devpost.com/" target="_blank">VIEW 2020 WINNERS</a>
            </div>
        </div>
    )
}

export default StatsSection