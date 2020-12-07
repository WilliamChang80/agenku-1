import React, { useEffect, useState } from "react"
import { handleDelete, handleGet } from "../../../services/request"
import { Link } from "gatsby"
const AgencyProfilePages = ({id,author}) => {

  const [state,setState] = useState({
    thisAgencyData : {services : []},
    message : "",
    rerender : false,
  })

  const getThisAgencyProfile = async () => {
    const promise = await handleGet(`/user/${id}/agency`,true)
    const {data,code,message} = promise
    if (code === 200){
      setState(prevState => ({
        ...prevState,
         thisAgencyData: {...prevState.thisAgencyData,...data}
      }))
      getMyServices(data.id)
    }else{
      setState(prevState => ({
        ...prevState,
        message
      }))
    }
  }

  const getMyServices = async (id) => {
    const promise = await handleGet('/services/agency/' + id,true)
    const {data,code,message} = promise
    if (code === 200){
      setState(prevState => ({
        ...prevState,
        thisAgencyData: {...prevState.thisAgencyData,services : [...data]}
      }))
    }else{
      setState(prevState => ({
        ...prevState,
        message
      }))
    }
    console.log(state)
  }

  useEffect(() => {
    getThisAgencyProfile()
  },[])

  // useEffect(() => {
  //   getMyServices()
  // },[state.thisAgencyData.id])

  const clickDelete = async (e) => {
    const {value} = e.target
    const promise = await handleDelete(`/service/${value}`,true)
    const {code} = promise
    if (code === 200){
      getMyServices()
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

      {<div>
        <h2>{author && "My"} Services : </h2>
        {state.thisAgencyData.services.length === 0 ?
          <span>You have 0 services :( </span>
          :
          <div>
            <span>You have {state.thisAgencyData.services.length} services</span>
            <div className={'d-flex flex-wrap'}>
              {state.thisAgencyData.services.map(item => {
                return (<div className={'mx-3 shadow-lg p-3'}>
                  {Object.entries(item).map(([key,isi] )=> {
                    if (key === 'id') return
                    return (<div key={key}>
                      <div className={'my-3'}>service {key} : {typeof (isi) === 'object' ? isi.name : isi}</div>
                    </div>)
                  })}
                  {author ?
                  <div key={item.id} className={'d-flex justify-content-around'}>
                    <Link className={'btn btn-primary'} to={`/service/update`} state={item}> Update </Link>
                    <button className={'btn btn-danger'} onClick={clickDelete} type={"button"} value={item.id}>Delete</button>
                  </div> :
                    <div>
                      <Link className={'btn btn-primary'} state={{ id: item.id }} to={"/service"}> See More </Link>
                    </div>
                  }
                </div>)
              })}
            </div>
          </div>
        }
        {author &&
        <div className={'d-flex flex-column my-3'}>
          <span className={'my-3'}>Want to add your service?</span>
          <Link to={'/service/add'} className={'mb-5'}>Click Here!</Link>
        </div>
        }
      </div>}

    </div>
  )
}

export default AgencyProfilePages