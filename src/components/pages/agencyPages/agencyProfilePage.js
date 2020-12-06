import React, { useEffect, useState } from "react"
import { handleGet } from "../../../services/request"
import { Link } from "gatsby"
import { getUser } from "../../../services/auth"

const AgencyProfilePages = () => {
  const thisUser = getUser()

  const [state,setState] = useState({
    thisAgencyData : {services : []},
    message : ""
  })

  const getMyServices = async () => {
    const promise = await handleGet('/services/agency/' + thisUser.data.user.id,true)
    const {data,code,message} = promise
    console.log(data)
    if (code === 200){
      setState(prevState => ({
        ...prevState,
        thisAgencyData: {services : [...data]}
      }))
    }else{
      setState(prevState => ({
        ...prevState,
        message
      }))
    }
  }

  const getthisAgencyProfile = async () => {
    const promise = await handleGet(`/user/${thisUser.data.user.id}/agency`,true)
    const {data,code,message} = promise
    console.log(data)
    if (code === 200){
      setState(prevState => ({
        ...prevState,
         thisAgencyData: {...prevState.thisAgencyData,...data}
      }))
    }else{
      setState(prevState => ({
        ...prevState,
        message
      }))
    }
  }

  useEffect(() => {
    getthisAgencyProfile()
    getMyServices()
    console.log(state)
  },[])

  const cekState = () => {
    console.log(state)
  }

  return (
    <div>
      <div className={'btn btn-primary'} onClick={cekState}>debug button</div>
      <div className={state.message === "" ? 'd-none' : 'alert alert-danger'}>
        Oops, something went wrong
      </div>

      <h1>My profile as an agency</h1>
      <div>My name : {state.thisAgencyData.name}</div>
      <div>
        <h2>My services : </h2>
        {state.thisAgencyData.services.length === 0 ?
          <div className={'d-flex flex-column'}>
            <span>You have 0 services :( </span>
            <span>Want to register your service?</span>
            <Link to={'/register/service'}>Click Here!</Link>
          </div>
          :
          <div>
            <span>You have {state.thisAgencyData.services.length} services</span>
            <div className={'d-flex flex-wrap'}>
              {state.thisAgencyData.services.map(item => {
                return (<div className={'mx-3 shadow-lg '}>
                  {Object.entries(item).map(([key,isi] )=> {
                    return (<div>
                      <div>service {key} : {isi}</div>
                    </div>)
                  })}
                </div>)
              })}
            </div>

          </div>
        }
      </div>
    </div>
  )
}

export default AgencyProfilePages