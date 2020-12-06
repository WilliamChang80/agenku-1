import React, { useEffect, useState } from "react"
import { handleGet } from "../../../../services/request"

import Style from "./home.module.scss"
import Layout from "../../../layout"
import SEO from "../../../seo"


const ClientHomePage = () => {
  const [state,setState] = useState({
    categories : [],
    search : ""
  })

  useEffect( () => {
    async function fetchCategory() {
      const promise = await handleGet("/service-types",true)
      const {data} = promise;
      const {types} = data;
      setState(prevState => ({...prevState, categories : types}))
    }
    fetchCategory()
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      <div className={"mb-4"}>
        <h1 >Agencies</h1>
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
      {state.categories.map(item => {})}
      <div className={"row"}>
        <div className={`${ Style.category } col-lg-2`}>
          <div className={Style.categoryHeading}>
            <h2>Software <span>House</span></h2>
          </div>
          <div className={Style.categoryDesc}>
            <p>An agency for you to make website</p>
          </div>
        </div>
        <div className={"col-lg-2"}>
          service
        </div>
        <div className={"col-lg-2"}>
          service
        </div>
      </div>
    </Layout>
  )
}

export default ClientHomePage

