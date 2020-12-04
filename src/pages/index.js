import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { handleGet } from "../services/request"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Style from "./home.module.scss"


const IndexPage = () => {
  const [state,setState] = useState({
    categories : [],
  })

  useEffect( () => {
    async function fetchCategory() {
      const promise = await handleGet("/service-types",true)
      const {message, data, status} = promise;
      const {categories} = data;
      setState(prevState => ({...prevState, categories}))
    }
    fetchCategory()
  }, [])
  return (
    <Layout>
      <SEO title="Home" />
      <div className={"mb-4"}>
        <h1>Agencies</h1>
        <div className={"d-flex  justify-content-center "}>
          <div className={"shadow"}>
            <input className={Style.searchBox} />
            <span className={Style.searchBtn}>
            <i className={"fa fa-search text-white"}></i>
          </span>
          </div>
        </div>
      </div>

      {/*loop*/}
      <div className={"row"}>
        <div className={Style.category + " col-lg-2"}>
          <div className={Style.categoryHeading}>
            <h2>Software <span>House</span></h2>
          </div>
          <div className={Style.categoryDesc}>
            <p>An agency for you to make website</p>
          </div>
        </div>
        <div className={"col-lg-2"}>
          kartu
        </div>
        <div className={"col-lg-2"}>
          kartu
        </div>
      </div>

      <Link to="login">Go to login</Link> <br />
      <Link to="register">Go to register"</Link>
    </Layout>
  )
}


export default IndexPage
