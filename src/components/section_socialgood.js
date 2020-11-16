import React from "react"

import styles from "./css/section_socialgood.module.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"


const SocialGoodSection = () => {
    return (
        <div className="container-fluid p-0">
            <div className={`row no-gutters align-items-center ${styles.background}`}>
                <div className={`col-10 offset-1 col-xl-5 offset-xl-1 ${styles.description}`}>
                    <div className= {styles.title}>
                        Hack for Social Good
                    </div>
                    With the rapid advancement of technology, it is important to use its power in ways that benefit society. HackDavis challenges 
                    its participants to hack for social good, and create an opportunity for us to explore the intersection between technology and society.
                    <br></br>
                    <br></br>
                    On January 16-17, over 700 students, hackers, and creators will come together virtually for 36 hours of hacking. 
                    For the 6th year in a row, we're bringing the most talented students in California (and beyond!) to address the world’s most pressing issues.
                </div>
                <div className={`${styles.social_good_container} col-10 offset-1 col-xl-4 offset-xl-1`}>
                    <img className={styles.image} src="https://filmdaily.co/wp-content/uploads/2020/05/cat-memes-lede.jpg"></img>
                </div>
            </div>
        </div>
    )
}

export default SocialGoodSection