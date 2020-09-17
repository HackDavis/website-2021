import React, { useState, useEffect, useCallback } from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';
import styles from "./css/navbar.module.css"
import { getUser, isLoggedIn } from "../utils/auth"


const Navitem = ({ setLoginModalIsOpen, setProfileModalIsOpen, name, section_id }) => {

    function OnClickBehavior(section_id) {
        if (section_id == "login") {
            if (!isLoggedIn()) {
                setLoginModalIsOpen(true);
            }
            else {
                setProfileModalIsOpen(true);
            }
        }
        else {
            scrollTo(`#${section_id}`)
        }
    }

    let button_text = name;

    if (section_id == "login")
    {
        if (isLoggedIn())
        {
            const { displayName } = getUser();
            button_text = displayName;
        }
        else
        {
            button_text = "Log In";
        }
    }

    const is_profile_button = section_id == "login" && isLoggedIn();

    return (
        <div class={`${styles.navitem}`} data-id={section_id}>
            <button class={`${styles.navbutton} ${is_profile_button && styles.profile}`} onClick={() => OnClickBehavior(section_id)}>
                {is_profile_button && <img class={styles.circle} src={getUser().photoURL} />}
                {button_text}
            </button>
            <div className={styles.underline}></div>
        </div >
    );
}

export default Navitem

{/* hidden comment in this file if you find it then you get a cookie! email nicholas@hackdavis.io for a cookie*/ }
