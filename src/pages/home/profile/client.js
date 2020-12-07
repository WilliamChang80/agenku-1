import React from "react"
import ClientProfilePage from "../../../components/pages/clientPages/clientProfilePage"
import Layout from "../../../components/layout"

const ClientOnlyProfile = ({id}) => {
  return(
    <Layout>
      <ClientProfilePage id={id}/>
    </Layout>
    )
}

export default ClientOnlyProfile