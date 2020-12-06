import React from "react"
import ClientHomePage from "../../../components/pages/clientPages/home/clientHome"
import AgencyHomePage from "../../../components/pages/agencyPages/agencyHomePage"

const HomePage = ({location,type}) => {
  if (type === 'client'){
    return <ClientHomePage/>
  }else{
    return <AgencyHomePage/>
  }
}

export default HomePage