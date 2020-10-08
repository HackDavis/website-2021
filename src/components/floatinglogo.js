import React, { useState } from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';
import styles from "./css/floatinglogo.module.css"
import { Link } from "gatsby"
import logo from "../images/hd-logo.svg"

function OnClickBehavior2()
{
    scrollTo('#section_landing')
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