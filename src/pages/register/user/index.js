import React from "react"
import AgencyRegistrationPage from "../../../components/pages/agencyPages/agencyRegistrationPage"
import ClientRegistrationPage from "../../../components/pages/clientPages/clientRegistrationPage"

const TypeRegistrationPage = ({location}) => {
  if (location.state.type === 'agency'){
    return <AgencyRegistrationPage/>
  }else{
    return <ClientRegistrationPage/>
  }
}

export default TypeRegistrationPage