import React from "react"
import { navigate } from "../../.cache/gatsby-browser-entry"

const IndexPage = () => {
  typeof window !== "undefined" && navigate("login")
  return <div></div>
}

export default IndexPage
