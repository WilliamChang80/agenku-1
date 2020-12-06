import React, { useEffect, useState } from "react"
import Style from './profile.module.scss'
import Layout from "../../../components/layout"
import { getUser } from "../../../services/auth"
import { handleGet } from "../../../services/request"
import {Link} from "gatsby"
import ClientProfilePage from "../../../components/pages/clientPages/clientProfilePage"
import AgencyProfilePages from "../../../components/pages/agencyPages/agencyProfilePage"
import { navigate } from "../../../../.cache/gatsby-browser-entry"

const ProfilePage = () => {
  const thisUser = getUser()
  if (thisUser.data.user.roles.length === 0 ){
    navigate('/home')
  }
  return(
    <Layout>
      {thisUser.data.user.roles.indexOf('CLIENT') !== -1 && <ClientProfilePage/>}
      {thisUser.data.user.roles.indexOf('AGENCIES') !== -1 && <AgencyProfilePages/>}
    </Layout>
  )
}

export default ProfilePage