import React, { useEffect, useState } from "react"
import { handleGet } from "../../services/request"
import Layout from "../../components/layout"

const ServicePage = ({location}) => {
  const [state,setState] = useState({
    service: {}
  })

  const getServiceData = async () => {
    const promise = await handleGet(`/service/${location.state.id}`,true)
    const {data} = promise
    console.log(data)
    setState(prevState => ({...prevState, service: data}))
  }

  useEffect(() => {
      getServiceData()
    console.log(state)
  },[])

  return(
    <Layout>
      <div className="card">
        <div className="card-header">
          Service Details
        </div>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </Layout>
  )
}

export default ServicePage