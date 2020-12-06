import React from "react"
import ServiceForm from "../../../components/pages/service/serviceForm"
import { handlePost } from "../../../services/request"


const RegisServicePage = () => {
  const type = 'add'
  return (<ServiceForm type={type} />)
}

export default RegisServicePage