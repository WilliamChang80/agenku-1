import React, { useEffect, useState } from "react"
import { handleGet } from "../../services/request"
import Layout from "../../components/layout"

const ServicePage = ({serviceId}) => {
  const [state,setState] = useState({})

  const getServiceData = async () => {
    const promise = await handleGet('/',true)
    const {data} = promise
    setState(...data)
  }

  useEffect(() => {
      getServiceData()
    console.log(state)
  },[])

  return(
    <Layout>
      ini service detail page
    </Layout>
  )
}

export default ServicePage