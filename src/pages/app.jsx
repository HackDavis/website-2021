import React from "react"
import { Router } from "@reach/router"
import Profile from "../pages/profile"
import Login from "./login"
import PrivateRoute from "../utils/private_route"
import Status from "../components/status"

const App = () => (
  // Was previously wrapped in a layout tag. In order to regain that (not sure if it actually affects the functionality of the page) 
  // place "/src/components/Layout" folder into our components folder
  <div>
    <Status />
    <Router>
      <PrivateRoute path="/app/profile" component={Profile} />
      <Login path="/app/login" />
    </Router>
  </div>
)

export default App