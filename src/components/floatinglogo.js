import React from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';
import styles from "./css/floatinglogo.module.css"

function OnClickBehavior2()
{
    scrollTo('#section_landing')
}

const FloatingLogo = ({ coloredLogo }) => {
    
    const logoColor = coloredLogo ? styles.colorLogo : styles.whiteLogo;

    return (
        <div>
            <button className={`${styles.floatinglogo} ${logoColor}`} onClick={()=> OnClickBehavior2()}></button>
            {/* <div className={styles.floatinglogo}></div> */}
        </div>
      );
}

export default FloatingLogo