import React from "react"

import styles from "./css/section.module.css"
import { Button } from 'reactstrap';


const Section = ({ children, id }) => {
    return (
        <>
        <div id={id} className={styles.section}>
        {children}</div>
        </>
    )
}

export default Section