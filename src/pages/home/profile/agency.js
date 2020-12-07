import React from "react"
import AgencyProfilePages from "../../../components/pages/agencyPages/agencyProfilePage"
import Layout from "../../../components/layout"

const AgencyOnlyProfilePage = ({location}) => {
  return (
    <Layout>
      <AgencyProfilePages id={location.state.id} author={false}/>
    </Layout>
    )
}

export default AgencyOnlyProfilePage