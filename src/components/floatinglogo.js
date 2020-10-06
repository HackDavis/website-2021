import React, { useState } from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';
import styles from "./css/floatinglogo.module.css"
import { Link } from "gatsby"

function OnClickBehavior2()
{
    scrollTo('#section1')
}

const FloatingLogo = () => {
    
    return (
        <div>
            <button className={styles.floatinglogo} onClick={()=> OnClickBehavior2()}></button>
            {/* <div className={styles.floatinglogo}></div> */}
        </div>
      );
}

export default FloatingLogo