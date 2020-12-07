import React from "react"
import ClientHomePage from "../../../components/pages/clientPages/home/clientHome"
import AgencyHomePage from "../../../components/pages/agencyPages/agencyHomePage"

const HomePage = ({location}) => {
  if (location.state.type === 'client'){
    return <ClientHomePage/>
  }else{
    return <AgencyHomePage/>
  }
}

export default HomePage