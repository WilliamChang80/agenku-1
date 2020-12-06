import React from "react"
import Layout from "../../components/layout"
import { getUser } from "../../services/auth"
import {Link} from "gatsby"
import { navigate } from "../../../.cache/gatsby-browser-entry"

const ChooseUserTypePage = () => {
  const {data} = getUser();
  if(!data){
    navigate('/login')
    return <div></div>
  }
  return (
    <Layout>
      <div className={'d-flex justify-content-around align-items-center'} style={{height : "70vh"}}>

        <Link to={data.user.roles.indexOf('CLIENT') !== -1 ? '/home/type/client' : '/register/user/client'}  className={'shadow-lg p-5 text-dark'}>
          <h1 className={'text-center'}>Customer</h1>
          <p>{data.user.roles.indexOf('CLIENT') !== -1 ? 'Checkout your user home' :'By clicking this you are registering yourself as customer'}</p>
        </Link>
        <Link to={data.user.roles.indexOf('AGENCIES') !== -1 ? '/home/type/agency' : '/register/user/agency'} className={'shadow-lg p-5 text-dark'}>
          <h1 className={'text-center'}>Agency</h1>
          <p>{data.user.roles.indexOf('AGENCIES') !== -1 ? "Checkout your agency home" : 'By clicking this you are registering yourself as agency'}</p>
        </Link>
      </div>
    </Layout>
  )
}

export default ChooseUserTypePage