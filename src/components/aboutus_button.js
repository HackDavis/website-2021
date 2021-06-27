// About us button for the landing section 

import React from 'react'
import styles from "./css/navbar.module.css"

export default function AboutUsButton({setAboutIsOpen}) {
    
    function RedirectToAbout() {
        setAboutIsOpen(true);
    }
    
    return (
        <button onClick={RedirectToAbout} className={styles.about_us}>
            About Us
        </button>
    )
}
