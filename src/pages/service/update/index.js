import React, { useEffect, useState } from "react"
import { handleGet } from "../../../services/request"
import ServiceForm from "../../../components/pages/service/serviceForm"


const UpdateServicePage = ({location}) => {
  return(
    <ServiceForm serviceData={location.state} title={'Update your service here'} type={'update'}/>
  )
}

export default UpdateServicePage