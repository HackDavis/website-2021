import React from "react"
import { useState} from "react"
// import { Link, navigate } from "@reach/router"
import { getUser, isLoggedIn, logout } from "../utils/auth"
import { useFirebase } from "gatsby-plugin-firebase"
import { NavItem } from "reactstrap"
import { Link } from 'gatsby';

export default () => {
  const [firebase, setFirebase] = useState();

  useFirebase(fb => {
    setFirebase(fb);
  }, [])

  let details;
  if (!isLoggedIn()) {
    details = (
        // <LinkContainer to="/app/profile">
        //     <NavItem name="Sign In"></NavItem>
        // </LinkContainer>
        <NavItem componentClass={Link} href="/app/profile">Sign In</NavItem>
    )
    // details = ( <Navitem name="Sign In"></Navitem> )
  } else {
    const { displayName, email } = getUser()
    details = (
        // <LinkContainer to="/app/profile">
        //     <NavItem name="Your Profile"></NavItem>
        // </LinkContainer>
        <NavItem componentClass={Link} href="/app/profile">Your Profile</NavItem>
    )
  }

  return {details}
}