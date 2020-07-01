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
import styles from "./css/navbar.module.css"
import styled from "styled-components"

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
                let anchorTop = $els.page.offset().top;

                if (scrollTop >= anchorTop)
                {
                    $(".nav-item").removeClass(styles.selected);
                    $els.navItem.addClass(styles.selected);
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
                <NavItem data-id="section1">
                  <Button onClick={()=> scrollTo('#section1')}>About</Button>
                  {/* <NavLink>About</NavLink> */}
                </NavItem>
                <NavItem data-id="section2">
                  <Button onClick={()=> scrollTo('#section2')}>Recap</Button>
                  {/* <NavLink href="/#section2">Recap</NavLink> */}
                </NavItem>
                <NavItem data-id="section3">
                  <Button onClick={()=> scrollTo('#section3')}>FAQ</Button>
                  {/* <NavLink href="/#section3">FAQ</NavLink> */}
                </NavItem>
                <NavItem data-id="section4">
                  <Button onClick={()=> scrollTo('#section4')}>Sponsors</Button>
                  {/* <NavLink href="/#section4">Sponsors</NavLink> */}
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
}

export default NavBar