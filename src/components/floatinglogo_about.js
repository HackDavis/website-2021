import React from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';
import styles from "./css/floatinglogo_about.module.css"


const FloatingLogoAbout= ({ coloredLogo }) => {
    
    const logoColor = coloredLogo ? styles.colorLogo : styles.whiteLogo;

    return (
        <div>
            <a className={`${styles.floatinglogo} ${logoColor}`} href="/"></a>
        </div> 
      );
}

export default FloatingLogoAbout