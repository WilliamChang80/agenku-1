import React from "react"
import Layout from "../../components/layout"
import { getUser } from "../../services/auth"
import {Link} from "gatsby"
import { navigate } from "../../../.cache/gatsby-browser-entry"
import ClientHomePage from "../../components/pages/clientPages/home/clientHome"

const ChooseUserTypePage = () => {
  const {data} = getUser();
  if(!data){
    navigate('/login')
  }
  console.log(data)
  return (
    <Layout>
      <div className={'d-flex justify-content-around align-items-center'} style={{height : "70vh"}}>
        <Link to={'/register/user/client'} state={{type : "client"}}   className={'shadow-lg p-5'}>
          <h1 className={'text-center'}>Customer</h1>
          <p>By clicking this you are registering yourself as customer</p>
        </Link>
        <Link to={'/register/user/agency'} state={{type : "agency"}} className={'shadow-lg p-5'}>
          <h1 className={'text-center'}>Agency</h1>
          <p>By clicking this you are registering yourself as agency</p>
        </Link>
      </div>
    </Layout>
  )
}

export default ChooseUserTypePage