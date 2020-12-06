import React from "react"
import ServiceForm from "../../../components/pages/service/serviceForm"


const RegisServicePage = () => {
  const type = 'add'
  return (<ServiceForm type={type} title={'Register your service here'} />)
}

export default RegisServicePage