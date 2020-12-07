import React, { useEffect, useState } from "react"
import { handleGet } from "../../../../services/request"
import {Link} from "gatsby"

import Style from "./home.module.scss"
import Layout from "../../../layout"
import SEO from "../../../seo"
import { getUser } from "../../../../services/auth"


const ClientHomePage = () => {
  const [state,setState] = useState({
    categories : [],
    search : "",
    agencies : []
  })

  async function fetchCategory() {
    const promise = await handleGet("/service-types",true)
    const {data} = promise;
    const {types} = data;
    setState(prevState => ({...prevState, categories : types}))
  }

  const fetchAgencyByUser = async () => {
    const userData = getUser()
    const promise = await handleGet(`/user/${userData.data.user.id}/agencies`,true)
    const {data} = promise
    setState(prevState => ({
      ...prevState,
      agencies: [...prevState.agencies,...data.agencies]
    }))

  }

  useEffect( () => {
    fetchAgencyByUser()
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

      <div className={'d-flex flex-wrap justify-content-around'}>
        {state.agencies.map((item,index) => {
          console.log(item)
          return(
            <div className="card my-3 shadow-lg" key={index}  style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted d-flex flex-column">rating : {item.rating} <br/> phone number : {item.phoneNumber}</h6>
                <p className="card-text">{item.description}</p>
                <div className={'d-flex justify-content-around'}>
                  <Link to={`/home/profile/agency`} state={{id : item.id}} className="btn btn-primary px-2">Agency profile</Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>



    </Layout>
  )
}

export default ClientHomePage

