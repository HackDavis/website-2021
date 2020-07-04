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
import {AnchorLink} from 'gatsby-plugin-anchor-links';

const Navitem = ( {name, section_id} ) => {

    return (
        <NavItem className={styles.navitem} data-id={section_id}>
            <Button color="link" className={styles.navbutton} onClick={()=> scrollTo(`#${section_id}`)}>{name}</Button>
            <div class={styles.underline}></div>
        </NavItem>
    );
}

export default Navitem

{/* hidden comment in this file if you find it then you get a cookie! email nicholas@hackdavis.io for a cookie*/}
