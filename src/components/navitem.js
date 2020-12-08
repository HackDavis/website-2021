import React, { useState, useEffect, useCallback } from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';
import styles from "./css/navbar.module.css"
import { getUser, isLoggedIn } from "../utils/auth"


const Navitem = ({ setLoginModalIsOpen, setProfileModalIsOpen, name, section_id }) => {

    const [sectionId, setSectionId] = useState("");

    useEffect(() => 
    {
        setSectionId(section_id);
    })

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

    const is_profile_button = sectionId == "login" && isLoggedIn();

    return (
        <div className={`${styles.navitem}`} data-id={section_id}>
            <button className={`${styles.navbutton} ${is_profile_button && styles.profile}`} onClick={() => OnClickBehavior(sectionId)}>
                {is_profile_button && <img className={styles.circle} src={getUser().photoURL} />}
                {button_text}
            </button>
            <div className={styles.underline}></div>
        </div >
    );
}

export default Navitem

{/* hidden comment in this file if you find it then you get a cookie! email nicholas@hackdavis.io for a cookie*/ }
