import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

import styles from "./css/navbar.module.css"

const NavBar = ( {toggle, isOpen} ) => {
    return (
        <div className={styles.navstyle}>
          <Navbar expand="md">
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="#section1">About</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#section2">Recap</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#section3">FAQ</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#section4">Sponsors</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
}

export default NavBar