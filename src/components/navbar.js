import React, { useState, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import scrollTo from 'gatsby-plugin-smoothscroll';
import ReactDOM from 'react-dom';
import $ from "jquery";
import styles from "./css/navbar.module.css";
import styled from "styled-components";
import Navitem from "./navitem";

const NavBar = ( {toggle, isOpen} ) => {

    useEffect(() => 
    {
        // Init anchor scrolling
        let navItems = $(".nav-item")
        console.log(navItems)
        let anchors = navItems.map(function(i, elem)
        {
            let id = $(elem).data('id');
            let $els = {
                navItem: navItems.eq(i),
                page: $(`#${id}`)
            }

            if (i == 0)
            {
                $els.navItem.find(`.${styles.underline}`).addClass(styles.selected);
            }

            return {id, $els};
        });

        $(window).scroll(function()
        {
            let scrollTop = $(this).scrollTop();

            // Detect scrolled to anchor
            for (let i = anchors.length - 1; i >= 0; i--)
            {
                let anchor = anchors[i];
                let $els = anchor.$els;
                let anchorTop = $els.page.offset().top - ($els.page.height()/2);

                if (scrollTop >= anchorTop)
                {
                    $(".nav-item").find(`div.${styles.underline}`).removeClass(styles.selected);
                    $els.navItem.find(`.${styles.underline}`).addClass(styles.selected);
                    break;
                }
                
            }
        });
    })

    return (
        <div className={styles.navstyle}>
          <Navbar expand="md">
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                  <Navitem name="About" section_id="section1"></Navitem>
                  <Navitem name="Recap" section_id="section2"></Navitem>
                  <Navitem name="FAQ" section_id="section3"></Navitem>
                  <Navitem name="Sponsors" section_id="section4"></Navitem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
}

export default NavBar