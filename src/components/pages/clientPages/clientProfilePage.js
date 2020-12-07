import React, { useEffect, useState } from "react"
import { handleGet } from "../../../services/request"
import { getUser } from "../../../services/auth"

const ClientProfilePage = ({id,author}) => {
  const [state,setState] = useState({
    name : '',
    location : '',
    phoneNumber : '',
    clientType : []
  })

  const getClientData = async () => {
    const promise = await handleGet(`/user/${id}/client`,true)
    const {data} = promise
    setState(prevState => ({
      ...data
    }))
    return
  }

  useEffect(() => {
    getClientData()
  },[])

  return(
    <div>
      <h1>My profile as a client</h1>
      {Object.entries(state).map(([key,value],index) => {
        if (key === 'id') return
        return(
          <div key={index} className={'my-3'}>
            Client {key} : {typeof (value) === "string" ? value : value.name}
          </div>
        )
      })}
    </div>
  )
}

export default ClientProfilePage