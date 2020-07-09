import React, { useState, useEffect } from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';
import styles from "./css/navbar.module.css"

function OnClickBehavior(section_id)
{
    if (section_id == "login")
    {
        if (typeof window.location.origin === 'undefined')
        {
            window.location.origin = window.location.protocol + '//' + window.location.host;
        }

        window.location = `${window.location.origin}/app/login`
    }
    else
    {
        scrollTo(`#${section_id}`)
    }
}

const Navitem = ( {name, section_id} ) => {

    return (
        <div className={styles.navitem} data-id={section_id}>
            <button className={styles.navbutton} onClick={()=> OnClickBehavior(section_id)}>{name}</button>
            <div className={styles.underline}></div>
        </div>
    );
}

export default Navitem

{/* hidden comment in this file if you find it then you get a cookie! email nicholas@hackdavis.io for a cookie*/}
