import React, { useEffect, useState } from "react"
import { handleDelete, handleGet } from "../../../services/request"
import { Link } from "gatsby"
import { getUser } from "../../../services/auth"

const AgencyProfilePages = () => {
  const thisUser = getUser()
  const [rerender,setRerender] = useState(true)
  const [state,setState] = useState({
    thisAgencyData : {id : "",services : []},
    message : ""
  })

  const getMyServices = async () => {
    const promise = await handleGet('/services/agency/' + state.thisAgencyData.id,true)
    const {data,code,message} = promise
    console.log(promise)
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

  const getThisAgencyProfile = async () => {
    const promise = await handleGet(`/user/${thisUser.data.user.id}/agency`,true)
    const {data,code,message} = promise
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
    getThisAgencyProfile()
  },[])

  useEffect(() => {
    getMyServices()
  },[state.thisAgencyData.id,rerender])

  const clickDelete = async (e) => {
    const {value} = e.target
    const promise = await handleDelete(`/service/${value}`,true)
    const {code} = promise
    if (code === 200){
      setRerender(!rerender)
    }
  }

  return (
    <div>
      <div className={state.message === "" ? 'd-none' : 'alert alert-danger'}>
        Oops, something went wrong : {state.message}
      </div>
      <h1>My profile as an agency</h1>
      {Object.entries(state.thisAgencyData).map(([key,value]) => {
        if(key === 'id' || key === 'services') return
        return <div key={key} className={'my-3'}>Agency {key} : {value}</div>
      })}
      <div>
        <h2>My services : </h2>
        {state.thisAgencyData.services.length === 0 ?
            <span>You have 0 services :( </span>
          :
          <div>
            <span>You have {state.thisAgencyData.services.length} services</span>
            <div className={'d-flex flex-wrap'}>
              {state.thisAgencyData.services.map(item => {
                return (<div className={'mx-3 shadow-lg p-3'}>
                  {Object.entries(item).map(([key,isi] )=> {
                    return (<div key={key}>
                      <div className={'my-3'}>service {key} : {typeof (isi) === 'object' ? isi.name : isi}</div>
                    </div>)
                  })}
                  <div className={'d-flex justify-content-around'}>
                    <Link className={'btn btn-primary'} to={`/register/service/update/${item.id}`} key={item.id}> Update </Link>
                    <button className={'btn btn-danger'} onClick={clickDelete} key={item.id} type={"button"} value={item.id}>Delete</button>
                  </div>
                </div>)
              })}
            </div>
          </div>
        }
        <div className={'d-flex flex-column my-3'}>
          <span className={'my-3'}>Want to add your service?</span>
          <Link to={'/register/service/'} className={'mb-5'}>Click Here!</Link>
        </div>

      </div>
    </div>
  )
}

export default AgencyProfilePages