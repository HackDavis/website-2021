
import "../components/css/clear.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <>
  <SEO description={`HackDavis is UC Davis' annual hackathon for students, run by students.`} lang={`en`} meta={ `meta`} title={'HackDavis 2021 | January 16-17 at UC Davis'}></SEO>
  <Layout>
  </Layout>
  </>
)

export default IndexPage
