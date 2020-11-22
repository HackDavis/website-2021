import React, { useState, useEffect } from 'react';
import $ from "jquery";
import styles from "./css/navbar.module.css";
import Navitem from "./navitem";
import { getUser, isLoggedIn } from "../utils/auth"

const NavBar = ({ setProfileModalIsOpen, setLoginModalIsOpen, setOnBottomPages, setColoredLogo, setFadeAbout, setFadeSocialGood }) => {

    useEffect(() => {
        // Init anchor scrolling
        let navItems = $(`.${styles.navitem}`)
        let anchors = navItems.map(function (i, elem) {
            let id = $(elem).data('id');

            let $els = {
                navItem: navItems.eq(i),
                page: $(`#${id}`)
            }

            return { id, $els };
        });

        function OnScroll()
        {
            let scrollTop = $(window).scrollTop();

            // Detect scrolled to anchor
            for (let i = anchors.length - 1; i >= 0; i--) {
                let anchor = anchors[i];
                let $els = anchor.$els;

                if ($els.page.length > 0) {
                    let anchorTop = $els.page.offset().top - ($els.page.height() / 2);
                    let anchorTop_full = $els.page.offset().top;

                    // if (scrollTop >= anchorTop_full)
                    // {
                    //     if (i < 2)
                    //     {
                    //         setOnBottomPages(false)
                    //     }
                    //     else
                    //     {
                    //         setOnBottomPages(true)
                    //     }
                    // }

                    if (i == 1 && scrollTop >= $els.page.offset().top + ($els.page.height() * 0.3))
                    {
                        setFadeSocialGood(true);
                    }

                    if (scrollTop >= anchorTop) {
                        $(`.${styles.navitem}`).find(`div.${styles.underline}`).removeClass(styles.selected);
                        $els.navItem.find(`.${styles.underline}`).addClass(styles.selected);

                        
                        if (i < 2 && i > 0)
                        {
                            // We are in stats or social good section
                            $(`.${styles.navitem} button`).addClass(styles.navbarcontainer_gradient)
                            setColoredLogo(true);
                            setFadeAbout(true);
                        }
                        else if (i == 0)
                        {
                            // We are on the landing page 
                            $(`.${styles.navitem} button`).removeClass(styles.navbarcontainer_gradient)
                            setColoredLogo(false);
                        }
                        else {
                            // We are past the stats or social good section
                            $(`.${styles.navitem} button`).removeClass(styles.navbarcontainer_gradient)
                            setColoredLogo(false);
                        }

                        break;
                    }

                }
            }
        }

        OnScroll();

        $(window).on("scroll", function () {
            OnScroll();
        });
    })

    return (
        <div className={styles.navbarcontainer}>
            <div className={styles.navbar}>
                <Navitem name="Home" section_id="section_landing"></Navitem>
                <Navitem name="About" section_id="section_about"></Navitem>
                {/* <Navitem name="Schedule" section_id="section_schedule"></Navitem> */}
                <Navitem name="FAQ" section_id="section_FAQ"></Navitem>
                <Navitem name="Sponsors" section_id="section_sponsors"></Navitem>
                <Navitem setProfileModalIsOpen={setProfileModalIsOpen} setLoginModalIsOpen={setLoginModalIsOpen} name="Log In" section_id="login"></Navitem>
            </div>
        </div>
    );
}

export default NavBar