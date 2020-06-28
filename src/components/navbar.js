import React, { useState } from 'react';
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
import styles from "./css/navbar.module.css"
import scrollTo from 'gatsby-plugin-smoothscroll';

const NavBar = ( {toggle, isOpen} ) => {
    return (
        <div className={styles.navstyle}>
          <Navbar expand="md">
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <Button onClick={()=> scrollTo('#section1')}>About</Button>
                  {/* <NavLink>About</NavLink> */}
                </NavItem>
                <NavItem>
                  <Button onClick={()=> scrollTo('#section2')}>Recap</Button>
                  {/* <NavLink href="/#section2">Recap</NavLink> */}
                </NavItem>
                <NavItem>
                  <Button onClick={()=> scrollTo('#section3')}>FAQ</Button>
                  {/* <NavLink href="/#section3">FAQ</NavLink> */}
                </NavItem>
                <NavItem>
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