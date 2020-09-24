import React from "react"

import styles from "./css/section.module.css"
import { Button } from 'reactstrap';
import parallaxstyles from "./css/parallax.module.css"


const Section = ({ children, id }) => {
    return (
        <div className={parallaxstyles.parallax__group}>
            <div id={id} className={styles.section}>{children}</div>
        </div>
    )
}

export default Section