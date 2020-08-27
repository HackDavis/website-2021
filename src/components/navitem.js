import React, { useState, useEffect, useCallback } from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';
import styles from "./css/navbar.module.css"
import Modal from "./modal"
import { getUser, isLoggedIn } from "../utils/auth"


const Navitem = ({ setLoginModalIsOpen, setProfileModalIsOpen, name, section_id }) => {

    function OnClickBehavior(section_id) {
        if (section_id == "login") {
            // if (typeof window.location.origin === 'undefined')
            // {
            //     window.location.origin = window.location.protocol + '//' + window.location.host;
            // }

            //window.location = `${window.location.origin}/app/login`
            //Modal.setIsOpen(true);
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

    const is_profile_button = section_id == "login" && isLoggedIn();

    let button_text = isLoggedIn() ? name : "Log In";

    if (is_profile_button) {
        const { displayName } = getUser();
        button_text = displayName;
    }

    console.log(is_profile_button)

    return (
        <div class={`${styles.navitem}`} data-id={section_id}>
            <button class={`${styles.navbutton} ${is_profile_button && styles.profile}`} onClick={() => OnClickBehavior(section_id)}>
                {is_profile_button && <div class={styles.circle} ></div>}
                {button_text}
            </button>
            <div className={styles.underline}></div>
        </div >
    );
}

export default Navitem

{/* hidden comment in this file if you find it then you get a cookie! email nicholas@hackdavis.io for a cookie*/ }
