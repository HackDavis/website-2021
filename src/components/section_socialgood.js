import React from "react"

import styles from "./css/section_socialgood.module.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"


const SocialGoodSection = () => {
    return (
        <div className="container-fluid p-0">
            <div className={`row no-gutters align-items-center ${styles.background}`}>
                <div className={`${styles.social_good_container} col-4 offset-1`}>
                    <img className={styles.image} src="https://filmdaily.co/wp-content/uploads/2020/05/cat-memes-lede.jpg"></img>
                </div>
                <div className={`col-4 offset-1 ${styles.description}`}>
                    <div className= {styles.title}>
                        Hack for social good
                    </div>
                    With the rapid advancement of technology, it is important to use its power in ways that benefit society. HackDavis challenges 
                    its participants to hack for social good, and create an opportunity for us to explore the intersection between technology and society.
                    <br></br>
                    <br></br>
                    On February 9-10, over 700 students, hackers, and creators came together for 24 hours of hacking. 
                    For the 4th year in a row, we brought the most talented students in California to address the world’s most pressing issues.
                </div>
            </div>
        </div>
    )
}

export default SocialGoodSection