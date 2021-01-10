import React, { useState, useEffect } from 'react';
import $ from "jquery";
import styles from "./css/navbar.module.css";
import Navitem from "./navitem";
import { getUser, isLoggedIn } from "../utils/auth"
import { useStaticQuery, graphql } from "gatsby"
const NavBar = ({ setProfileModalIsOpen, setLoginModalIsOpen, setOnBottomPages, setColoredLogo, setFadeAbout, setFadeSocialGood, setHamburgerMenuIsOpen, hamburgerMenuIsOpen}) => {
    
    const data = useStaticQuery(graphql`
    {
        allFile(filter: { name: {eq: "HamburgerMenu"}, extension: { eq: "svg"} }, sort: {fields:[name] order: ASC}) {
          edges {
            node {
              publicURL
              name
              dir
            }
          }
        }
      }
    `)

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

                    if (i == 1 && scrollTop >= $els.page.offset().top + ($els.page.height() * 0.3))
                    {
                        setFadeSocialGood(true);
                    }

                    if (scrollTop >= anchorTop) {
                        $(`.${styles.navitem}`).find(`div.${styles.underline}`).removeClass(styles.selected);
                        $els.navItem.find(`.${styles.underline}`).addClass(styles.selected);

                        
                        if (i == 1)
                        {
                            // We are in stats or social good section
                            $(`.${styles.navitem} button`).addClass(styles.navbarcontainer_gradient)
                            setColoredLogo(true);
                            setFadeAbout(true);

                            $(`.${styles.navitem} button.${styles.profile}`).addClass(styles.navbarcontainer_gradient_profile);
                        }
                        else {
                            // We are past the stats or social good section
                            $(`.${styles.navitem} button`).removeClass(styles.navbarcontainer_gradient)
                            $(`.${styles.navitem} button.${styles.profile}`).removeClass(styles.navbarcontainer_gradient_profile);
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

        $(`.${styles.hamburger_menu}`).on("click",function() {
                setHamburgerMenuIsOpen(true);
                if(!isLoggedIn()){
                    setLoginModalIsOpen(true);
                }
                else {
                    setProfileModalIsOpen(true);
                }
            }
        )
        // Cleanup event handlers
        return () => {
            // clean up the event handler when the component unmounts
            $(`.${styles.hamburger_menu}`).off("click")
        }
    })

    return (
        <div className={styles.navbarcontainer}>
            <div className={styles.navbar}>
                <img className={styles.hamburger_menu} src={data.allFile.edges[0].node.publicURL}/>
                <Navitem name="Home" section_id="section_landing" visibility={false}></Navitem>
                <Navitem name="About" section_id="section_about" visibility={true}></Navitem>
                <Navitem name="Livestreams" section_id="section_livestream" visibility={true}></Navitem>
                <Navitem name="Schedule" section_id="section_schedule" visibility={true}></Navitem>
                <Navitem name="Sponsors" section_id="section_sponsors" visibility={true}></Navitem>
                <Navitem setProfileModalIsOpen={setProfileModalIsOpen} setLoginModalIsOpen={setLoginModalIsOpen} name="Log In" section_id="login" visibility={true}></Navitem>
            </div>
        </div>
    );
}

export default NavBar