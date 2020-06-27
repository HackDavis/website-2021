
import "../components/css/clear.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site. hello</p>
    <p>Now go build something great.</p>
    <p>brought to you by HackDavis overlords:</p>
    <ul>
      <li><b>Supreme Commander Benjamin Ankiel</b></li>
      <li><b>SGT. Omid Mogasemi</b></li>
      <li><b>PFC. Nicholas Sulistio</b></li>
      <li><b>SGT. Alex Long</b></li>
    </ul>
  </Layout>
)

export default IndexPage
