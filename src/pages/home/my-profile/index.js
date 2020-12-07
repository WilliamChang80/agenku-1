import React from "react"
import Layout from "../../../components/layout"
import { getUser } from "../../../services/auth"
import ClientProfilePage from "../../../components/pages/clientPages/clientProfilePage"
import AgencyProfilePages from "../../../components/pages/agencyPages/agencyProfilePage"
import { navigate } from "gatsby"

const ProfilePage = () => {
  const thisUser = getUser()
  if (thisUser.data.user.roles.length === 0 ){
    navigate('/home')
  }
  return(
    <Layout>
      {thisUser.data.user.roles.indexOf('CLIENT') !== -1 && <ClientProfilePage id={thisUser.data.user.id}/>}
      {thisUser.data.user.roles.indexOf('AGENCIES') !== -1 && <AgencyProfilePages id={thisUser.data.user.id} author={true}/>}
    </Layout>
  )
}

export default ProfilePage