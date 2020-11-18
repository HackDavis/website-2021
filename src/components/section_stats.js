import React from "react"
import { Link } from "gatsby"

import styles from "./css/section_stats.module.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

const StatsSection = () => {
    return (
        <div className = "container-fluid p-0">
            <div className={`row no-gutters align-items-center ${styles.background}`}>
                <div className={`col-10 offset-1 col-md-5 offset-md-1 ${styles.image_container}`}>
                    <img className={styles.image} src="https://filmdaily.co/wp-content/uploads/2020/04/CatMemeQuarantine-lede.jpg"></img>
                </div>
                <div className={`${styles.statscontainer} col-10 offset-1 col-sm-5 col-md-4 offset-md-1`}>
                    <div className = "row no-gutters">
                        <div className = "col-12">
                            <div className={styles.header_date}>
                                January 16 - 17, 2021  |  Hosted Virtually
                            </div>
                        </div>
                    </div>
                    <div className = "row no-gutters">
                        <div className= "col-12">
                            <div className={styles.stats}>
                                600+ HACKERS<br></br>
                                36 HOURS<br></br>
                                110+ PROJECTS<br></br>
                                $25,000+ PRIZES<br></br>
                            </div>
                        </div>
                    </div>
                    <div className = "row no-gutters">
                        <div className={`${styles.view_winner_button_container} col-12 col-sm-12` }>
                            <div className = {styles.view_winner}>
                                <a href="https://hackdavis2020.devpost.com/" target="_blank">
                                    <div className={styles.winnertext}>
                                        VIEW 2020 WINNERS
                                    </div>
                                </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom_diagonal}></div>
            </div>
    )
}

export default StatsSection