import React, { useEffect, useState } from "react"
import Layout from "../../../../components/layout"
import ServiceForm from "../../../../components/pages/service/serviceForm"
import { handleGet } from "../../../../services/request"

const UpdateServicePage = ({id}) => {
  const [serviceData,setServiceData] = useState({})

  const getServiceData = async () => {
      const promise = await handleGet(`/service/${id}`,true)
      return promise.data
  }


  useEffect(() => {
    setServiceData(getServiceData())
  }, [])
  return(
    <ServiceForm data={serviceData} type={'update'}/>
  )
}

export default UpdateServicePage