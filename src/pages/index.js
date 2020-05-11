import React from "react"

import Layout from "../components/layout"
import Content from "../components/Content"
import SEO from "../components/seo"
import Scene from  "../components/scene"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Content />
    <Scene />
  </Layout>
)

export default IndexPage
